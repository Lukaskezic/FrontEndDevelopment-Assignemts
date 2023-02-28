using DebtBook.Models;
using DebtBook.Views;
using DebtBook.Data;
using DebtBook.Utilities;
using Microsoft.Win32;
using Prism.Commands;
using Prism.Mvvm;
using System;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows;
using System.Windows.Media;
using System.Windows.Threading;
using System.IO;
using System.Windows.Media.Animation;
using Clock = DebtBook.Utilities.Clock;

namespace DebtBook.ViewModels
{
    public class MainWindowViewModel : BindableBase
    {
        DispatcherTimer timer = new DispatcherTimer();
        private readonly string AppTitle = "DebtBook";
        private string filePath = "";
        private ObservableCollection<Debtor> debtors;
        private Debtor currentDebtor;
        private string filename = "";
        private bool dirty = false;
        public MainWindowViewModel()
        {
            Debtors = new ObservableCollection<Debtor>();
        }

        public Debtor CurrentDebtor
        {
            get { return currentDebtor; }
            set { SetProperty(ref currentDebtor, value); }
        }

        public ObservableCollection<Debtor> Debtors
        {
            get { return debtors; }
            set { SetProperty(ref debtors, value); }
        }

        private int currentIndex;
        public int CurrentIndex
        {
            get { return currentIndex; }
            set { SetProperty(ref currentIndex, value); }
        }

        public string Filename
        {
            get { return filename; }
            set
            {
                SetProperty(ref filename, value);
                RaisePropertyChanged("Title");
            }
        }

        public string Title
        {
            get
            {
                var s = "";
                if (Dirty)
                    s = "*";
                return Filename + s + " - " + AppTitle;
            }
        }
        public bool Dirty
        {
            get { return dirty; }
            set
            {
                SetProperty(ref dirty, value);
                RaisePropertyChanged("Title");
            }
        }


        private DelegateCommand addCommand;
        public DelegateCommand AddCommand =>
            addCommand ?? (addCommand = new DelegateCommand(ExecuteAddCommand));

        void ExecuteAddCommand()
        {
            var newDebtor = new Debtor();
            var vm = new DebtorViewModel("Add new debtor", newDebtor);

            var dlg = new DebtorView
            {
                DataContext = vm
            };
            if (dlg.ShowDialog() == true)
            {
                Debtors.Add(newDebtor);
                CurrentDebtor = newDebtor; // Or CurrentIndex = Debtors.Count - 1;
                Dirty = true;
            }                                                                                                                  
        }

        private DelegateCommand closeAppCommand;
        public DelegateCommand CloseAppCommand =>
            closeAppCommand ?? (closeAppCommand = new DelegateCommand(ExecuteCloseAppCommand));

        void ExecuteCloseAppCommand()
        {
            Application.Current.MainWindow.Close();
        }

        DelegateCommand _NewFileCommand;
        public DelegateCommand NewFileCommand
        {
            get { return _NewFileCommand ?? (_NewFileCommand = new DelegateCommand(NewFileCommand_Execute)); }
        }

        private DelegateCommand _editCommand;
        public DelegateCommand EditCommand =>
            _editCommand ?? (_editCommand = new DelegateCommand(ExecuteEditCommand, CanExecuteEditCommand)
            .ObservesProperty(() => CurrentIndex));

        void ExecuteEditCommand()
        {
            var tempDebtor = CurrentDebtor.Clone();

            var vm = new ShowDebitsViewModel("Edit debtor", CurrentDebtor)
            {
             

            };
            var dlg = new ShowDebitsView
            {
                DataContext = vm,
                Owner = Application.Current.MainWindow
            };
            if (dlg.ShowDialog() == true)
            {
                foreach (var newTransaction in tempDebtor.Transactions)
                {
                    int count = 0;
                    CurrentDebtor.Transactions.Add(tempDebtor.Transactions[count]);
                    count++;
                }

            }
        }

        Clock clock = new Clock();
        public Clock Clock { get => clock; set => clock = value; }

        bool CanExecuteEditCommand()
        {
            return CurrentIndex >= 0;
        }

        private void NewFileCommand_Execute()
        {
            MessageBoxResult res = MessageBox.Show("Any unsaved data will be lost. Are you sure you want to initiate a new file?", "Warning",
                MessageBoxButton.YesNo, MessageBoxImage.Question, MessageBoxResult.No);
            if (res == MessageBoxResult.Yes)
            {
                Debtors.Clear();
                Filename = "";
                Dirty = false;
            }
        }


        DelegateCommand _OpenFileCommand;
        public DelegateCommand OpenFileCommand
        {
            get { return _OpenFileCommand ?? (_OpenFileCommand = new DelegateCommand(OpenFileCommand_Execute)); }
        }

        private void OpenFileCommand_Execute()
        {
            var dialog = new OpenFileDialog
            {
                Filter = "Debtor assignment documents|*.agn|All Files|*.*",
                DefaultExt = "agn"
            };
            if (filePath == "")
                dialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            else
                dialog.InitialDirectory = Path.GetDirectoryName(filePath);

            if (dialog.ShowDialog(App.Current.MainWindow) == true)
            {
                filePath = dialog.FileName;
                Filename = Path.GetFileName(filePath);
                try
                {
                    Debtors = Repository.ReadFile(filePath);
                    Dirty = false;
                }
                catch (Exception ex)
                {
                    MessageBox.Show(ex.Message, "Unable to open file", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        DelegateCommand _SaveAsCommand;
        public DelegateCommand SaveAsCommand
        {
            get { return _SaveAsCommand ?? (_SaveAsCommand = new DelegateCommand(SaveAsCommand_Execute)); }
        }

        private void SaveAsCommand_Execute()
        {
            var dialog = new SaveFileDialog
            {
                Filter = "Debtor assignment documents|*.agn|All Files|*.*",
                DefaultExt = "agn"
            };
            if (filePath == "")
                dialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            else
                dialog.InitialDirectory = Path.GetDirectoryName(filePath);

            if (dialog.ShowDialog(App.Current.MainWindow) == true)
            {
                filePath = dialog.FileName;
                Filename = Path.GetFileName(filePath);
                SaveFile();
            }
        }

        DelegateCommand _SaveCommand;
        public DelegateCommand SaveCommand
        {
            get
            {
                return _SaveCommand ?? (_SaveCommand = new DelegateCommand(SaveFileCommand_Execute, SaveFileCommand_CanExecute)
                  .ObservesProperty(() => Debtors.Count));
            }
        }

        private void SaveFileCommand_Execute()
        {
            SaveFile();
        }

        private bool SaveFileCommand_CanExecute()
        {
            return (filename != "") && (Debtors.Count > 0);
        }

        private void SaveFile()
        {
            try
            {
                Repository.SaveFile(filePath, Debtors);
                Dirty = false;
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Unable to save file", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        DelegateCommand<CancelEventArgs> _closingCommand;
        public DelegateCommand<CancelEventArgs> ClosingCommand
        {
            get
            {
                return _closingCommand ?? (_closingCommand = new
                  DelegateCommand<CancelEventArgs>(ClosingCommand_Execute));
            }
        }

        private void ClosingCommand_Execute(CancelEventArgs arg)
        {
            if (Dirty)
                arg.Cancel = UserRegrets();
        }

        private bool UserRegrets()
        {
            var regret = false;
            MessageBoxResult res = MessageBox.Show("You have unsaved data. Are you sure you want to close the application without saving data first?",
                            "Warning", MessageBoxButton.YesNo, MessageBoxImage.Question, MessageBoxResult.No);
            if (res == MessageBoxResult.No)
            {
                regret = true;
            }
            return regret;
        }

    }
}
