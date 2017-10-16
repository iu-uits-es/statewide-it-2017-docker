using System.Linq;
using TodoApi.Models;
using TodoApp.Models;

namespace TodoApp.Data
{
    public static class DbInitializer
    {
        public static void Initialize(TodoContext context)
        {
            context.Database.EnsureCreated();

            if (context.Todos.Any())
            {
                return;
            }

            var todos = new Todo[]
            {
                new Todo{Summary="Add Todo REST Controller"},
                new Todo{Summary="Setup Entity Framework"},
                new Todo{Summary="Add a migration and data seeder"},
                new Todo{Summary="Create React frontend"}
            };

            foreach (Todo todo in todos)
            {
                context.Todos.Add(todo);
            }
            context.SaveChanges();
        }

    }

}
