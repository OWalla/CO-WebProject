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
    public class UserController : BaseController
    {
        private StoreContext db = new StoreContext();

        // GET: User
        public ActionResult Index()
        {
            if (base.isPermitted())
                return View(db.Users.ToList());

            return HttpNotFound("Or no access");
        }

        // GET: Search
        public ActionResult Search(string firstName, string lastName, string email)
        {
            List<User> retVal = new List<User>();

            bool hasFirstName = !string.IsNullOrEmpty(firstName);
            bool hasLastName = !string.IsNullOrEmpty(lastName);
            bool hasEmail = !string.IsNullOrEmpty(email);

            if (hasFirstName || hasLastName || hasEmail)
            {
                retVal = db.Users.Where(x =>
                    ((hasFirstName && x.FirstName.ToUpper().Contains(firstName.ToUpper())) || (!hasFirstName)) &&
                    ((hasLastName && x.LastName.ToUpper().Contains(lastName.ToUpper())) || (!hasLastName)) &&
                    ((hasEmail && x.Email.ToUpper().Contains(email.ToUpper())) || (!hasEmail)))
                    .ToList();
            }

            return View(retVal);
        }

        // GET: User/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            User user = db.Users.Find(id);
            if (user == null)
            {
                return HttpNotFound();
            }
            return View(user);
        }

        // GET: User/Create
        public ActionResult Create()
        {
            if (base.isPermitted())
                return View();
            return HttpNotFound("Or no access");
        }

        // POST: User/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,FirstName,LastName,Email")] User user)
        {
            if (base.isPermitted())
            {
                if (ModelState.IsValid)
                {
                    db.Users.Add(user);
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }

                return View(user);
            }
            return HttpNotFound("Or no access");
        }

        // GET: User/Edit/5
        public ActionResult Edit(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                User user = db.Users.Find(id);
                if (user == null)
                {
                    return HttpNotFound();
                }
                return View(user);
            }
            return HttpNotFound("Or no access");
        }

        // POST: User/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,FirstName,LastName,Email")] User user)
        {
            if (base.isPermitted())
            {
                if (ModelState.IsValid)
                {
                    db.Entry(user).State = EntityState.Modified;
                    db.SaveChanges();
                    return RedirectToAction("Index");
                }
                return View(user);
            }
            return HttpNotFound("Or no access");
        }

        // GET: User/Delete/5
        public ActionResult Delete(int? id)
        {
            if (base.isPermitted())
            {
                if (id == null)
                {
                    return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
                }
                User user = db.Users.Find(id);
                if (user == null)
                {
                    return HttpNotFound();
                }
                return View(user);
            }
            return HttpNotFound("Or no access");
        }

        // POST: User/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            if (!base.isPermitted())
                return HttpNotFound("Or no access");

            User user = db.Users.Find(id);
            db.Users.Remove(user);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        // GET: User/Popularity
        public ActionResult Popularity()
        {
            // join select for users and their comments
            var query = (from u in db.Users
                         join comment in db.Comments on u.ID equals comment.UserID
                         select new userCommentsViewModel
                         {
                             FirstName = u.FirstName,
                             LastName = u.LastName,
                             Comment = comment.Content,
                             UserID = u.ID
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
