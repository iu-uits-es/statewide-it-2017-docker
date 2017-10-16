using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using System.Linq;
using TodoApp.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)
        {
            _context = context;

            if (_context.Todos.Count() == 0)
            {
                _context.Todos.Add(new Todo { Summary = "Item1" });
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public IEnumerable<Todo> GetAll()
        {
            return _context.Todos.ToList();
        }

        [HttpGet("{id}", Name = "GetTodo")]
        public IActionResult GetById(long id)
        {
            var item = _context.Todos.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }

        [HttpPost]
        public IActionResult Create([FromBody] Todo todo)
        {
            if (todo == null)
            {
                return BadRequest();
            }

            _context.Todos.Add(todo);
            _context.SaveChanges();

            return CreatedAtRoute("GetTodo", new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public IActionResult Update(long id, [FromBody] Todo todo)
        {
            if (todo == null || todo.Id != id)
            {
                return BadRequest();
            }

            var persistedTodo = _context.Todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            persistedTodo.Done = todo.Done;
            persistedTodo.Summary = todo.Summary;

            _context.Todos.Update(persistedTodo);
            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpPatch("{id}")]
        public IActionResult PartialUpdate(long id, [FromBody] Todo todo)
        {
            var persistedTodo = _context.Todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            persistedTodo.Done = todo.Done;
            persistedTodo.Summary = todo.Summary == null ? persistedTodo.Summary : todo.Summary;

            _context.Todos.Update(persistedTodo);
            _context.SaveChanges();
            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            var todo = _context.Todos.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }

    }
}