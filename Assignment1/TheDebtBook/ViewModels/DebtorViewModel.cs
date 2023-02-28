using DebtBook.Models;
using Prism.Commands;
using Prism.Mvvm;
using System.Windows.Input;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Media;
using System.Windows.Threading;
using DebtBook.ViewModels;

namespace DebtBook.ViewModels
{
    public class DebtorViewModel : BindableBase
    {
        private string title;
        Debtor currentDebtor;
        Transaction _currentTransac;
        public DebtorViewModel(string title, Debtor debtor)
        {
            Title = title;
            CurrentDebtor = debtor;
        }

        #region Properties
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

        public bool IsValid
        {
            get
            {
                bool isValid = true;
                if (string.IsNullOrWhiteSpace(CurrentDebtor.Name))
                    isValid = false;
                return isValid;
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
        #endregion

        #region Commands

        ICommand _okBtnCommand;

        public ICommand OkBtnCommand
        {
            get
            {
                return _okBtnCommand ?? (_okBtnCommand = new DelegateCommand(
                    OkBtnCommand_Execute, OkBtnCommand_CanExecute)
                  .ObservesProperty(() => CurrentDebtor.Name)
                  .ObservesProperty(() => CurrentDebtor.Amount2));
            }
        }

        private void OkBtnCommand_Execute()
        {
            CurrentDebtor.Transactions.Add(new Transaction(currentDebtor.Amount2));
        }

        private bool OkBtnCommand_CanExecute()
        {
            return IsValid;
        }

        #endregion
    }
}
