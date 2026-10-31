package ba.edu.pf.catalog.dto;

import java.math.BigDecimal;

public record ProductFilter(String search, Long categoryId,
                            BigDecimal minPrice, BigDecimal maxPrice,
                            Boolean availableOnly) {
}
