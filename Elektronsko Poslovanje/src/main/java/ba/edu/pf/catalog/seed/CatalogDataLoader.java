package ba.edu.pf.catalog.seed;

import ba.edu.pf.catalog.domain.Category;
import ba.edu.pf.catalog.domain.Product;
import ba.edu.pf.catalog.repository.CategoryRepository;
import ba.edu.pf.catalog.repository.ProductRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class CatalogDataLoader implements ApplicationRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CatalogDataLoader(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        if (productRepository.count() > 0) {
            return;
        }

        List<Category> categories = categoryRepository.saveAll(List.of(
                new Category("Audio", "Slušalice, zvučnici i audio oprema."),
                new Category("Računari", "Laptopi i dodatna računarska oprema."),
                new Category("Telefonija", "Mobilni telefoni i oprema."),
                new Category("Kućna elektronika", "Uređaji za svakodnevnu upotrebu."),
                new Category("Gaming", "Konzole, kontroleri i oprema za igranje.")
        ));

        List<ProductModel> models = List.of(
                new ProductModel(0, "Slušalice Pulse", 89, "Čist i uravnotežen zvuk za muziku i pozive."),
                new ProductModel(0, "Zvučnik MiniBeat", 64, "Kompaktan Bluetooth zvučnik za ponijeti."),
                new ProductModel(0, "Slušalice Studio", 149, "Udobne slušalice za duže slušanje."),
                new ProductModel(0, "Soundbar Cinema", 229, "Puniji zvuk za filmove i serije."),
                new ProductModel(0, "Earbuds Air", 79, "Male bežične slušalice s praktičnom kutijicom."),
                new ProductModel(0, "Mikrofon Stream", 109, "USB mikrofon za pozive, nastavu i streaming."),
                new ProductModel(0, "Gramofon Retro", 279, "Gramofon jednostavan za kućno slušanje vinila."),
                new ProductModel(0, "Zvučnik PartyBox", 189, "Snažniji zvuk za druženja i proslave."),
                new ProductModel(1, "Laptop NovaBook 14", 899, "Lagan laptop za studij, posao i svakodnevne zadatke."),
                new ProductModel(1, "Monitor Vision 27", 329, "Oštar prikaz i udobna veličina za radni sto."),
                new ProductModel(1, "Tastatura Mechanical", 119, "Mehanička tastatura s prijatnim odzivom tipki."),
                new ProductModel(1, "Gaming miš Vector", 69, "Precizan miš s podesivom osjetljivošću."),
                new ProductModel(1, "Vanjski SSD Pocket 1TB", 139, "Brza i prenosiva pohrana za dokumente i projekte."),
                new ProductModel(1, "Web kamera Focus", 84, "Jasna slika za online sastanke i predavanja."),
                new ProductModel(1, "USB-C Dock Pro", 129, "Jednostavno povezivanje dodatne opreme na laptop."),
                new ProductModel(1, "Podloga Desk XL", 39, "Prostrana podloga za tastaturu i miš."),
                new ProductModel(2, "Smartphone Nova X", 749, "Moderan telefon za fotografije, komunikaciju i aplikacije."),
                new ProductModel(2, "Punjač FastCharge 30W", 35, "Kompaktan USB-C punjač za brzo punjenje."),
                new ProductModel(2, "Maskica Flex", 24, "Lagano kućište koje štiti telefon od ogrebotina."),
                new ProductModel(2, "Power bank 20K", 79, "Dodatna energija kada si u pokretu."),
                new ProductModel(2, "USB-C kabl Braided", 18, "Izdržljiv kabl za punjenje i prenos podataka."),
                new ProductModel(2, "Pametni sat Active", 189, "Pregled aktivnosti i obavijesti na zapešću."),
                new ProductModel(2, "Tablet NovaTab 11", 419, "Praktičan ekran za čitanje, bilješke i zabavu."),
                new ProductModel(2, "Bežični punjač Qi", 45, "Urednije punjenje kompatibilnih uređaja."),
                new ProductModel(3, "Pročišćivač zraka Pure", 249, "Tih uređaj za ugodniji zrak u prostoriji."),
                new ProductModel(3, "Robot usisivač Clean", 399, "Pomaže u održavanju čistih podova svaki dan."),
                new ProductModel(3, "Pametna sijalica Glow", 29, "Podesivo osvjetljenje za različite dijelove dana."),
                new ProductModel(3, "Aparat za kafu Aroma", 159, "Jednostavna priprema omiljene jutarnje kafe."),
                new ProductModel(3, "Blender Compact", 74, "Praktičan blender za napitke i manje obroke."),
                new ProductModel(3, "Električni čajnik Quick", 49, "Brzo zagrijavanje vode uz automatsko isključivanje."),
                new ProductModel(3, "LED traka RGB", 34, "Ambijentalno osvjetljenje iza monitora ili televizora."),
                new ProductModel(3, "Pametna utičnica Home", 32, "Upravljanje kompatibilnim kućnim uređajima."),
                new ProductModel(4, "Konzola PlayCube", 599, "Igraća konzola za opuštanje kod kuće."),
                new ProductModel(4, "Kontroler Wireless", 79, "Bežični kontroler udobnog oblika."),
                new ProductModel(4, "Gaming slušalice Arena", 99, "Slušalice s mikrofonom za timsku igru."),
                new ProductModel(4, "Gaming monitor FastView", 389, "Brz prikaz za dinamične igre."),
                new ProductModel(4, "Web kamera Stream", 89, "Kamera za razgovore i prijenos uživo."),
                new ProductModel(4, "Gaming stolica Core", 279, "Podesiva stolica za duže sesije za računarom."),
                new ProductModel(4, "Tastatura RGB Strike", 109, "Tastatura s pozadinskim osvjetljenjem i numeričkim dijelom."),
                new ProductModel(4, "Gamepad Arcade", 59, "Kontroler za igre koje je zabavnije igrati zajedno.")
        );
        String[] editions = {"Graphite", "Silver", "Midnight", "Pearl", "Blue"};
        List<Product> products = new ArrayList<>();
        int sku = 1;
        for (ProductModel model : models) {
            for (int edition = 0; edition < editions.length; edition++) {
                long priceInFening = (model.price() + edition * 7L) * 100 + (sku % 5L) * 20;
                BigDecimal price = BigDecimal.valueOf(priceInFening, 2);
                int stock = sku % 13 == 0 ? 0 : (sku * 3) % 25 + 1;
                Category category = categories.get(model.categoryIndex());
                products.add(new Product(
                        "SKU-%04d".formatted(sku),
                        model.name() + " — " + editions[edition],
                        model.description(),
                        price,
                        stock,
                        true,
                        category
                ));
                sku++;
            }
        }
        productRepository.saveAll(products);
    }

    private record ProductModel(int categoryIndex, String name, long price, String description) { }
}
