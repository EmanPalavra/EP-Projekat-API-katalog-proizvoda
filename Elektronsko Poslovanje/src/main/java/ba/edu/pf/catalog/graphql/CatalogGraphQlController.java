package ba.edu.pf.catalog.graphql;

import ba.edu.pf.catalog.dto.CategoryView;
import ba.edu.pf.catalog.dto.ProductFilter;
import ba.edu.pf.catalog.dto.ProductPage;
import ba.edu.pf.catalog.dto.ProductSort;
import ba.edu.pf.catalog.dto.ProductView;
import ba.edu.pf.catalog.dto.SortDirection;
import ba.edu.pf.catalog.service.CatalogService;
import graphql.GraphQLError;
import graphql.GraphqlErrorBuilder;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.BatchMapping;
import org.springframework.graphql.data.method.annotation.GraphQlExceptionHandler;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.execution.ErrorType;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

@Controller
public class CatalogGraphQlController {

    private final CatalogService catalogService;

    public CatalogGraphQlController(CatalogService catalogService) {
        this.catalogService = catalogService;
    }

    @QueryMapping
    public ProductPage products(@Argument ProductFilter filter,
                                @Argument Integer page,
                                @Argument Integer size,
                                @Argument ProductSort sortBy,
                                @Argument SortDirection direction) {
        return catalogService.findProducts(filter, page, size, sortBy, direction);
    }

    @QueryMapping
    public ProductView product(@Argument Long id) {
        return catalogService.findProduct(id).orElse(null);
    }

    @QueryMapping
    public List<CategoryView> categories() {
        return catalogService.findCategories();
    }

    @QueryMapping
    public CategoryView category(@Argument Long id) {
        return catalogService.findCategory(id).orElse(null);
    }

    @BatchMapping(typeName = "Product", field = "category")
    public Map<ProductView, CategoryView> category(List<ProductView> products) {
        return catalogService.findCategoriesFor(products);
    }

    @GraphQlExceptionHandler
    public GraphQLError handleInvalidArgument(IllegalArgumentException exception) {
        return GraphqlErrorBuilder.newError()
                .errorType(ErrorType.BAD_REQUEST)
                .message(exception.getMessage())
                .build();
    }
}
