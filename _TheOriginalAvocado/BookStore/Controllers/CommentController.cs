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

namespace BookStore.Controllers
{
    public class CommentController : BaseController
    {
        private StoreContext db = new StoreContext();

        // GET: Comment
        public ActionResult Index()
        {
           
            if (base.isPermitted())
            {
                var comments = db.Comments.Include(c => c.Book).Include(c => c.User);
                return View(comments.ToList());
            }

            return HttpNotFound("Or no access");
        }

        // GET: Search
        public ActionResult Search(int? userId)
        {
            List<Comment> retVal = new List<Comment>();

            if (userId.HasValue)
            {
                retVal = db.Comments.Where(x => x.UserID == userId.Value).ToList<Comment>();
            }


            return View(retVal);
        }

        // GET: Comment/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return HttpNotFound();
            }
            return View(comment);
        }

        // GET: Comment/Create
        public ActionResult Create()
        {
            if (base.isPermitted())
            {
                ViewBag.BookID = new SelectList(db.Books, "ID", "Name");
                ViewBag.UserID = new SelectList(db.Users, "ID", "FirstName");
                return View();
            }
            return HttpNotFound("Or no access");
        }

        // POST: Comment/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Title,Content,UserID,BookID")] Comment comment)
        {
            if (ModelState.IsValid)
            {
                db.Comments.Add(comment);
                db.SaveChanges();
                return RedirectToAction("PublicDetails", "Book", new { id = comment.BookID });
            }

            ViewBag.BookID = new SelectList(db.Books, "ID", "Name", comment.BookID);
            ViewBag.UserID = new SelectList(db.Users, "ID", "FirstName", comment.UserID);
            return RedirectToAction("PublicDetails", "Book", new { id = comment.BookID });
        }

        // GET: Comment/Edit/5
        public ActionResult Edit(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Comment comment = db.Comments.Find(id);
                if (comment == null)
                {
                    return HttpNotFound();
                }
                ViewBag.BookID = new SelectList(db.Books, "ID", "Name", comment.BookID);
                ViewBag.UserID = new SelectList(db.Users, "ID", "FirstName", comment.UserID);
                return View(comment);
            }
            return HttpNotFound("Or no access");
        }

        // POST: Comment/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Title,Content,UserID,BookID")] Comment comment)
        {
            if (base.isPermitted())
            {
                if (ModelState.IsValid)
                {
                    db.Entry(comment).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                ViewBag.BookID = new SelectList(db.Books, "ID", "Name", comment.BookID);
                ViewBag.UserID = new SelectList(db.Users, "ID", "FirstName", comment.UserID);
                return View(comment);
            }

            return HttpNotFound("Or no access");
        }

        // GET: Comment/Delete/5
        public ActionResult Delete(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                Comment comment = db.Comments.Find(id);
                if (comment == null)
                {
                    return HttpNotFound();
                }
                return View(comment);
            }

            return HttpNotFound("Or no access");
        }

        // POST: Comment/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            if (!base.isPermitted())
                return HttpNotFound("Or no access");

            Comment comment = db.Comments.Find(id);
            db.Comments.Remove(comment);
            db.SaveChanges();
            return RedirectToAction("Index");
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
