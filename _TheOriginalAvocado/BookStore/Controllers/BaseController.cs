using BookStore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace BookStore.Controllers
{
    public class BaseController : Controller
    {
        protected static string IS_PENDING = "isPending";

        /// <summary>
        /// Checks if the current user is authenticated and is admin...
        /// </summary>
        /// <returns></returns>
        protected bool isPermitted()
        {
            if (Request.IsAuthenticated)
                return this.isAdmin(User.Identity.Name);

            return false;
        }

        /// <summary>
        /// Checks if a certain user is an adimn
        /// </summary>
        /// <param name="UserName"></param>
        /// <returns></returns>
        protected bool isAdmin(string UserName)
        {
            ApplicationDbContext accountDb = new ApplicationDbContext();

            var user = accountDb.Users.Where(x => x.UserName == UserName).FirstOrDefault();
            if (user != null && user.IsAdmin)
                return true;

            return false;
        }

        /// <summary>
        /// If the user is waiting to be authorised as an admin...
        /// </summary>
        /// <returns></returns>
        protected bool isPendingRequest()
        {
            string isPending = Response.Cookies.Get(IS_PENDING) != null ? Response.Cookies.Get(IS_PENDING).Value : "false";
            if (!string.IsNullOrEmpty(isPending) && isPending == "true")
                return true;

            return false;
        }
    }
}
