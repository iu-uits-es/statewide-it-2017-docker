package edu.iu.es.esi.demo.repository;

import edu.iu.es.esi.demo.domain.Todo;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.UUID;

@RepositoryRestResource(collectionResourceRel = "todos", path = "todos")
public interface TodoRepository extends PagingAndSortingRepository<Todo, String> {

    @Override
    <S extends Todo> S save(S s);

    @Override
    Todo findOne(String s);

    @Override
    Page<Todo> findAll(Pageable pageable);

}
