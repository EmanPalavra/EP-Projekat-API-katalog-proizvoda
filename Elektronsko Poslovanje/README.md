# GraphQL katalog proizvoda

Studentski projekat za temu „Izrada GraphQL API-ja za katalog proizvoda s optimizacijom upita prema bazi“.

## Šta aplikacija radi

Početna stranica `/` prikazuje katalog s pretragom, filterima po kategoriji, cijeni i dostupnosti, sortiranjem i paginacijom. Stranica učitava podatke iz istog GraphQL API-ja, dostupnog na `/graphql`. Kartice biraju fotografije prema tipu proizvoda; koriste Unsplash CDN, uz kategorijske ilustracije kao rezervu ako fotografija nije dostupna. Prekidač teme mijenja svijetli/tamni prikaz i pamti izbor u pregledniku. GraphiQL interfejs za ručno slanje upita dostupan je na `/graphiql?path=/graphql`.

Podaci se čuvaju u H2 bazi koja se kreira pri pokretanju. Pri prvom pokretanju ubacuje se 200 demo proizvoda raspoređenih u pet kategorija. Demo cijene su višekratnici od 0,20 KM. Za rad s PostgreSQL bazom postoji opcionalni profil i `docker-compose.yml`.

## Tehnologije

- Java 21
- Spring Boot 3.5
- Spring for GraphQL
- Spring Data JPA i Hibernate
- H2 za lokalni demo; PostgreSQL kao alternativna baza
- Maven

## Pokretanje u IntelliJ IDEA-i

1. Otvoriti ovu fasciklu kao Maven projekat.
2. Sačekati da IntelliJ učita Maven zavisnosti.
3. Postaviti Project SDK na JDK 21 ili noviji.
4. Pokrenuti `CatalogApplication`.
5. Otvoriti `http://localhost:8080/` za katalog ili `http://localhost:8080/graphiql?path=/graphql` za GraphiQL.

Ili iz terminala, uz instaliran Maven:

```powershell
mvn spring-boot:run
```

## PostgreSQL profil

Za pokretanje demonstracije na PostgreSQL-u:

```powershell
docker compose up -d postgres
mvn spring-boot:run "-Dspring-boot.run.profiles=postgres"
```

Podrazumijevani demo koristi H2 i ne zahtijeva Docker. PostgreSQL profil koristi lokalni kontejner i bazu `product_catalog`.

## Primjeri GraphQL upita

Prvih deset proizvoda s kategorijama:

```graphql
query {
  products(page: 0, size: 10, sortBy: PRICE, direction: ASC) {
    totalElements
    totalPages
    hasNext
    items {
      id
      sku
      name
      price
      stock
      category {
        name
      }
    }
  }
}
```

Pretraga proizvoda koji su na stanju i koštaju najviše 150 KM:

```graphql
query {
  products(filter: { search: "slušalice", maxPrice: 150, availableOnly: true }) {
    items { name price stock category { name } }
  }
}
```

Detalji proizvoda i kategorije:

```graphql
query {
  product(id: "1") {
    name
    description
    price
    category { id name description }
  }
}
```

## Optimizacija pristupa podacima

Entitet `Product` ima lijenu vezu prema kategoriji, ali se entiteti ne vraćaju direktno iz GraphQL kontrolera. Servis ih pretvara u DTO objekte koji nose ID kategorije. Za polje `Product.category` kontroler koristi Spring GraphQL `@BatchMapping`: sve različite ID-eve kategorija sa stranice učita jednim `findAllById` upitom i zatim ih upari s proizvodima.

Test `nestedCategoryIsLoadedInOneBatchForAProductPage` pošalje upit za deset proizvoda s kategorijama i provjerava Hibernate statistiku. Očekivani broj SQL naredbi je tri: upit za stranicu proizvoda, upit za ukupan broj rezultata i jedan grupisani upit za kategorije. Broj upita za kategorije zato ne raste s brojem proizvoda na stranici.

Paginacija je ograničena na najviše 100 proizvoda po zahtjevu. Sortiranje prima enum vrijednost koja se prevodi u jedno od dva dozvoljena polja, tako da se naziv kolone ne uzima direktno iz teksta korisničkog upita.

## Struktura

```text
src/main/java/ba/edu/pf/catalog/
  config/       GraphQL scalar konfiguracija
  domain/       JPA entiteti Product i Category
  dto/          objekti koji se vraćaju kroz GraphQL
  graphql/      GraphQL query i batch resolveri
  repository/   Spring Data JPA repozitoriji
  seed/         početni demo podaci
  service/      pretraga, paginacija i mapiranje u DTO
src/main/resources/graphql/schema.graphqls
src/main/resources/static/       katalog (HTML, CSS i JavaScript)
src/test/java/ba/edu/pf/catalog/
```

Izvori fotografija i autori navedeni su u `docs/IMAGE_CREDITS.md`.

## Testovi

Integracijski testovi šalju GraphQL upite prema aplikaciji pokrenutoj na nasumičnom portu. Pokrivaju grupisano učitavanje kategorija, filtriranje, sortiranje, paginaciju i ograničenje veličine stranice.

```powershell
mvn test
```

## Ograničenja i moguća proširenja

Demo podaci su izmišljeni i namijenjeni lokalnom radu. API je fokusiran na čitanje kataloga; administrativne izmjene proizvoda, autentikacija, narudžbe i plaćanje nisu dio ove teme. Za produkcijsku primjenu trebalo bi dodati autorizaciju, migracije šeme, ograničenje dubine/složenosti GraphQL upita i nadzor performansi.
