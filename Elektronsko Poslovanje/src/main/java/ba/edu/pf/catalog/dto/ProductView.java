package ba.edu.pf.catalog.dto;

import java.math.BigDecimal;

public record ProductView(Long id, String sku, String name, String description,
                          BigDecimal price, int stock, boolean active, Long categoryId) {
}
