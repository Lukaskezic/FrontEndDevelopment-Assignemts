using Prism.Mvvm;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DebtBook.Models
{
    public class Transaction : BindableBase
    {
        string date;
        double amount;

        public Transaction()
        {
            Date = DateTime.Now.ToString("g");
            amount = 0;
        }

        public Transaction(double aamount)
        {
            Date = DateTime.Now.ToString("g");
            amount = aamount;
        }

        public string Date
        {
            get { return date; }
            set { SetProperty(ref date, value); }
        }

        public double Amount
        {
            get
            {
                return amount;
            }

            set
            {
                SetProperty(ref amount, value);

            }
        }

    }
}
