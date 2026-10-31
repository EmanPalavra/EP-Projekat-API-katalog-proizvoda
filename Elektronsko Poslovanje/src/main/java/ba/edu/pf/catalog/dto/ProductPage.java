package ba.edu.pf.catalog.dto;

import java.util.List;

public record ProductPage(List<ProductView> items, int page, int size,
                          int totalElements, int totalPages, boolean hasNext) {
}
