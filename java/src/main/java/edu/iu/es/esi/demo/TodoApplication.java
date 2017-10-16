package edu.iu.es.esi.demo;

import edu.iu.es.esi.demo.domain.Todo;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

@SpringBootApplication
@EnableCaching
@EnableJpaRepositories
public class TodoApplication extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Todo.class, Todo.class);
    }

    public static void main(String[] args) {
		SpringApplication.run(TodoApplication.class, args);
	}

}
