using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace BookStore.Models
{
    public class Book
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public int YearPublished { get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
    }
    public class AuthorGroupViewModel
    {
        public string Author { get; set; }
        public int Count { get; set; }
    }
    public class bookCommentsViewModel
    {
        public string Name { get; set; }
        public string Author { get; set; }
        public int YearPublished { get; set; }
        public int bookID { get; set; }
        public string Comments { get; set; }

    }  
}