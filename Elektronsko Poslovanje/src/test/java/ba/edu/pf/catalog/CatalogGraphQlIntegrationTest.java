package ba.edu.pf.catalog;

import org.hibernate.SessionFactory;
import org.hibernate.stat.Statistics;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.ExecutionGraphQlService;
import org.springframework.graphql.test.tester.ExecutionGraphQlServiceTester;
import org.springframework.test.context.ActiveProfiles;

import jakarta.persistence.EntityManagerFactory;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
class CatalogGraphQlIntegrationTest {

    @Autowired
    private ExecutionGraphQlService executionGraphQlService;

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    private Statistics statistics;

    @BeforeEach
    void clearSqlStatistics() {
        statistics = entityManagerFactory.unwrap(SessionFactory.class).getStatistics();
        statistics.clear();
        graphQlTester = ExecutionGraphQlServiceTester.create(executionGraphQlService);
    }

    private ExecutionGraphQlServiceTester graphQlTester;

    @Test
    void nestedCategoryIsLoadedInOneBatchForAProductPage() {
        graphQlTester.document("""
                        query {
                            products(page: 0, size: 10) {
                                totalElements
                                items {
                                    name
                                    category { name }
                                }
                            }
                        }
                        """)
                .execute()
                .path("products.totalElements").entity(Integer.class).isEqualTo(100)
                .path("products.items[*].category.name").entityList(String.class).hasSize(10);

        // Page query + total count + one IN query for all categories in the page.
        assertThat(statistics.getPrepareStatementCount()).isEqualTo(3);
    }

    @Test
    void filtersAndPaginationReturnOnlyMatchingProducts() {
        graphQlTester.document("""
                        query {
                            products(
                                filter: { search: "slušalice", availableOnly: true }
                                page: 0
                                size: 5
                                sortBy: PRICE
                                direction: ASC
                            ) {
                                totalElements
                                items { name stock price }
                            }
                        }
                        """)
                .execute()
                .path("products.totalElements").entity(Integer.class).isEqualTo(9)
                .path("products.items[*].stock").entityList(Integer.class).hasSize(5);
    }

    @Test
    void priceRangeUsesTheBigDecimalScalar() {
        graphQlTester.document("""
                        query {
                            products(filter: {
                                search: "slušalice"
                                minPrice: 20.50
                                maxPrice: 50.00
                            }) {
                                totalElements
                                items { price }
                            }
                        }
                        """)
                .execute()
                .path("products.totalElements").entity(Integer.class).isEqualTo(2)
                .path("products.items[*].price").entityList(Double.class).hasSize(2);
    }

    @Test
    void pageSizeCannotExceedConfiguredLimit() {
        graphQlTester.document("{ products(size: 101) { totalElements } }")
                .execute()
                .errors()
                .satisfy(errors -> assertThat(errors).isNotEmpty());
    }
}
