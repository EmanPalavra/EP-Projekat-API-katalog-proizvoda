package ba.edu.pf.catalog.service;

import ba.edu.pf.catalog.domain.Category;
import ba.edu.pf.catalog.domain.Product;
import ba.edu.pf.catalog.dto.CategoryView;
import ba.edu.pf.catalog.dto.ProductFilter;
import ba.edu.pf.catalog.dto.ProductPage;
import ba.edu.pf.catalog.dto.ProductSort;
import ba.edu.pf.catalog.dto.ProductView;
import ba.edu.pf.catalog.dto.SortDirection;
import ba.edu.pf.catalog.repository.CategoryRepository;
import ba.edu.pf.catalog.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    private static final int MAX_PAGE_SIZE = 100;

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public CatalogService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public ProductPage findProducts(ProductFilter filter, Integer page, Integer size,
                                    ProductSort sortBy, SortDirection direction) {
        int pageNumber = page == null ? 0 : page;
        int pageSize = size == null ? 20 : size;

        if (pageNumber < 0) {
            throw new IllegalArgumentException("Broj stranice ne može biti negativan.");
        }
        if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
            throw new IllegalArgumentException("Veličina stranice mora biti između 1 i 100.");
        }

        ProductSort selectedSort = sortBy == null ? ProductSort.NAME : sortBy;
        SortDirection selectedDirection = direction == null ? SortDirection.ASC : direction;
        String sortProperty = selectedSort == ProductSort.PRICE ? "price" : "name";
        Sort.Direction sortDirection = selectedDirection == SortDirection.DESC
                ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort stableSort = Sort.by(sortDirection, sortProperty).and(Sort.by(Sort.Direction.ASC, "id"));
        Pageable pageable = PageRequest.of(pageNumber, pageSize, stableSort);

        Page<Product> result = productRepository.findAll(buildSpecification(filter), pageable);
        List<ProductView> items = result.getContent().stream().map(this::toProductView).toList();

        return new ProductPage(items, result.getNumber(), result.getSize(),
                Math.toIntExact(result.getTotalElements()), result.getTotalPages(), result.hasNext());
    }

    @Transactional(readOnly = true)
    public Optional<ProductView> findProduct(Long id) {
        return productRepository.findById(id).map(this::toProductView);
    }

    @Transactional(readOnly = true)
    public List<CategoryView> findCategories() {
        return categoryRepository.findAll(Sort.by("name")).stream()
                .map(this::toCategoryView)
                .toList();
    }

    @Transactional(readOnly = true)
    public Optional<CategoryView> findCategory(Long id) {
        return categoryRepository.findById(id).map(this::toCategoryView);
    }

    @Transactional(readOnly = true)
    public Map<ProductView, CategoryView> findCategoriesFor(List<ProductView> products) {
        List<Long> ids = products.stream()
                .map(ProductView::categoryId)
                .distinct()
                .toList();

        Map<Long, CategoryView> categoriesById = categoryRepository.findAllById(ids).stream()
                .map(this::toCategoryView)
                .collect(Collectors.toMap(CategoryView::id, Function.identity()));

        return products.stream().collect(Collectors.toMap(
                Function.identity(),
                product -> categoriesById.get(product.categoryId())
        ));
    }

    private Specification<Product> buildSpecification(ProductFilter filter) {
        return (root, query, builder) -> {
            var predicates = new java.util.ArrayList<jakarta.persistence.criteria.Predicate>();
            if (filter == null) {
                return builder.conjunction();
            }

            if (filter.search() != null && !filter.search().isBlank()) {
                String pattern = "%" + filter.search().trim().toLowerCase() + "%";
                predicates.add(builder.or(
                        builder.like(builder.lower(root.get("name")), pattern),
                        builder.like(builder.lower(root.get("sku")), pattern)
                ));
            }
            if (filter.categoryId() != null) {
                predicates.add(builder.equal(root.get("category").get("id"), filter.categoryId()));
            }
            if (filter.minPrice() != null) {
                predicates.add(builder.greaterThanOrEqualTo(root.get("price"), filter.minPrice()));
            }
            if (filter.maxPrice() != null) {
                predicates.add(builder.lessThanOrEqualTo(root.get("price"), filter.maxPrice()));
            }
            if (Boolean.TRUE.equals(filter.availableOnly())) {
                predicates.add(builder.greaterThan(root.get("stock"), 0));
            }

            return builder.and(predicates.toArray(jakarta.persistence.criteria.Predicate[]::new));
        };
    }

    private ProductView toProductView(Product product) {
        return new ProductView(product.getId(), product.getSku(), product.getName(),
                product.getDescription(), product.getPrice(), product.getStock(),
                product.isActive(), product.getCategory().getId());
    }

    private CategoryView toCategoryView(Category category) {
        return new CategoryView(category.getId(), category.getName(), category.getDescription());
    }
}
