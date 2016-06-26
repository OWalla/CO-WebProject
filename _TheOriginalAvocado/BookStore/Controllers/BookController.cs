using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using BookStore.DAL;
using BookStore.Models;
using System.Security.Authentication;

namespace BookStore.Controllers
{
    public class BookController : BaseController
    {
        private StoreContext db = new StoreContext();

        // This is the list!
        // GET: Book
        public ActionResult Index()
        {
            ApplicationDbContext accountDb = new ApplicationDbContext();
            if (base.isPermitted())
                return View(db.Books.ToList());

            return HttpNotFound("Or no access");
        }

        /// <summary>
        /// Help method for List and search books
        /// </summary>
        private List<Book> SearchBook(string name, string author, int? afterYear)
        {
            bool hasName = !string.IsNullOrEmpty(name);
            bool hasAuthor = !string.IsNullOrEmpty(author);
            bool hasYear = afterYear.HasValue;

            if (hasName || hasAuthor || hasYear)
            {
                return db.Books.Where(x =>
                    ((hasName && x.Name.ToUpper().Contains(name.ToUpper())) || (!hasName)) &&
                    ((hasAuthor && x.Author.ToUpper().Contains(author.ToUpper())) || (!hasAuthor)) &&
                    ((hasYear && x.YearPublished > afterYear.Value) || (!hasYear)))
                    .ToList();
            }
            else
            {
                return db.Books.ToList();
            }
        }

        // This is the search!
        // GET: List
        public ActionResult List(string name, string author, int? afterYear)
        {
            return View(SearchBook(name,author, afterYear));
        }


        // This is the search!
        // For AJAX (partial view)
        // GET: List
        public ActionResult ListAJAX(string name, string author, int? afterYear)
        {
            return PartialView("BookList", SearchBook(name,author, afterYear));
        }

        // GET: Book/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }
            return View(book);
        }

        // GET: Book/PublicDetails/5
        public ActionResult PublicDetails(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Book book = db.Books.Find(id);
            if (book == null)
            {
                return HttpNotFound();
            }

            ViewBag.Title = book.Name;
            ViewBag.UserID = db.Users.Select(g => new SelectListItem
            {
                Text = g.FirstName + " " + g.LastName,
                Value = g.ID.ToString()
            }).ToList();

            return View(book);
        }

        // GET: Book/Create
        public ActionResult Create()
        {
            if (base.isPermitted())
                return View();

            return HttpNotFound("Or no access");
        }

        // POST: Book/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Name,Author,Description,YearPublished")] Book book)
        {

            if (base.isPermitted())
            {
                if (ModelState.IsValid)
                {
                    db.Books.Add(book);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }

                return View(book);
            }
            return HttpNotFound("Or no access");
        }

        // GET: Book/Edit/5
        public ActionResult Edit(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Book book = db.Books.Find(id);
                if (book == null)
                {
                    return HttpNotFound();
                }
                return View(book);
            }
            return HttpNotFound("Or no access");
        }

        // POST: Book/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Name,Author,Description,YearPublished")] Book book)
        {
            if (base.isPermitted())
            {
                if (ModelState.IsValid)
                {
                    db.Entry(book).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(book);
            }
            return HttpNotFound("Or no access");
        }

        // GET: Book/Delete/5
        public ActionResult Delete(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Book book = db.Books.Find(id);
                if (book == null)
                {
                    return HttpNotFound();
                }
                return View(book);
            }
            return HttpNotFound("Or no access");
        }

        // POST: Book/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            if (!base.isPermitted())
                return HttpNotFound("Or no access");
            Book book = db.Books.Find(id);
            db.Books.Remove(book);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: Book/Author
        public ActionResult Author()
        {   
            var model = db.Books.GroupBy(b => b.Author)
            .Select(g => new AuthorGroupViewModel
            {
                Author = g.Key,
                Count = g.Count()
            })
            .ToList();
            return View(model);
        }

        // GET: Book/Popularity
        public ActionResult Popularity()
        {
            // join select for books and their comments
            var query = (from b in db.Books join comment in db.Comments on b.ID equals comment.BookID
                    select new bookCommentsViewModel
                    {
                        Name = b.Name,
                        Author = b.Author,
                        YearPublished = b.YearPublished,
                        bookID = b.ID,
                        Comments = comment.Content
                    });
            return View(query.ToList());
        }


        protected override void Dispose(bool disposing)
        {
            if (!base.isPermitted())
                return;

            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
