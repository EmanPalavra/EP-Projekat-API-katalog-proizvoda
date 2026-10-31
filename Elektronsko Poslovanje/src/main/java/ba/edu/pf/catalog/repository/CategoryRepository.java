package ba.edu.pf.catalog.repository;

import ba.edu.pf.catalog.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
