using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Todo
    {
        public long Id { get; set; }
        public string Summary { get; set; }
        public Boolean Done { get; set; }

    }
}
