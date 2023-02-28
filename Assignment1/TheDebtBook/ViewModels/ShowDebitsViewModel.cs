using DebtBook.Models;
using Prism.Commands;
using Prism.Mvvm;
using System.Windows.Input;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Diagnostics;
using System.Runtime.CompilerServices;
using System.Transactions;
using System.Windows;
using System.Windows.Media;
using System.Windows.Threading;
using DebtBook.ViewModels;
using Transaction = DebtBook.Models.Transaction;

namespace DebtBook.ViewModels
{
    public class ShowDebitsViewModel : BindableBase
    {
        private string title;
        private Debtor currentDebtor;
        private List<Transaction> transactions;
        Transaction _currentTransac;
        public ShowDebitsViewModel(string title, Debtor debtor)
        {
            Title = title;
            CurrentDebtor = debtor;
            Transactions = debtor.Transactions;
            CurrentTransac = new Transaction();
        }

        #region Properties

        public List<Transaction> Transactions
        {
            get
            {
                return transactions;
            }
            set
            {
                SetProperty(ref transactions, value);
            }
        }

        public string Title
        {
            get { return title; }
            set
            {
                SetProperty(ref title, value);
            }
        }

        public Debtor CurrentDebtor
        {
            get { return currentDebtor; }
            set
            {
                SetProperty(ref currentDebtor, value);
            }
        }

        public Transaction CurrentTransac
        {
            get
            {
                return _currentTransac;
            }
            set
            {
                SetProperty(ref _currentTransac, value);
            }
        }

        //bool isValid;

        public bool IsValid
        {
            get
            {
                bool isValid = true;
               
                return isValid;
            }
            //set
            //{
            //    SetProperty(ref isValid, value);
            //}
        }
        #endregion

        #region Commands

        public ICommand _okBtnCommand2;

        public ICommand OkBtnCommand2
        {
            get
            {
                return _okBtnCommand2 ?? (_okBtnCommand2 = new DelegateCommand(
                    OkBtnCommand2_Execute, OkBtnCommand2_CanExecute));
            }
        }

        private void OkBtnCommand2_Execute()
        {
            Transaction newTransaction = new Transaction();
            newTransaction.Amount = CurrentTransac.Amount;
            CurrentDebtor.Transactions.Add(newTransaction);
            calculateSum();
        }

        private bool OkBtnCommand2_CanExecute()
        {
            return IsValid;
        }

    void calculateSum()
        {
            double sum = 0;
            foreach (Transaction transaction in CurrentDebtor.Transactions)
            {
                sum += transaction.Amount;
            }

            CurrentDebtor.Amount2 = sum;
        }

        #endregion
    }
}