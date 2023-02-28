using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Mvvm;

namespace DebtBook.Models

{
    public class Debtor : BindableBase
    {

        string name;
        double amount2;
        List<Transaction> transactions;

        public Debtor()
        {
            transactions = new List<Transaction>();
        }

        public Debtor(string name, double iniAmount)
        {
            Name = name;
            amount2 = iniAmount;
            transactions = new List<Transaction>();
            transactions.Add(new Transaction(iniAmount));
        }
        public Debtor Clone()
        {
            return this.MemberwiseClone() as Debtor;
        }

        public string Name
        {
            get
            {
                return name;
            }
            set
            {
                SetProperty(ref name, value); ;
            }
        }

        public double Amount2
        {
            get
            {
                return amount2;
            }
            set
            {
                SetProperty(ref amount2, value); ;
            }
        }

        public List<Transaction> Transactions
        {
            get
            {
                return transactions;
            }
            set
            {
                SetProperty(ref transactions, value); ;
            }
        }


    }
}
