package ba.edu.pf.catalog.config;

import graphql.scalars.ExtendedScalars;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

@Configuration
public class GraphQlScalarConfiguration {

    @Bean
    RuntimeWiringConfigurer decimalScalar() {
        return wiring -> wiring.scalar(ExtendedScalars.GraphQLBigDecimal);
    }
}
