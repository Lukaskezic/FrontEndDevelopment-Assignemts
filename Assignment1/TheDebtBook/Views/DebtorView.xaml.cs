﻿using DebtBook.ViewModels;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DebtBook.Views
{
    /// <summary>
    /// Interaction logic for AddDebtWindow.xaml
    /// </summary>
    public partial class DebtorView : Window
    {
        public DebtorView()
        {
            InitializeComponent();
        }

        private void btnOk_Click(object sender, RoutedEventArgs e)
        {
            var vm = DataContext as DebtorViewModel;
            if (vm.IsValid)
                DialogResult = true;
            else
                MessageBox.Show("Enter values for Amount and Name");
        }

        private void tbxCodeName_TextChanged(object sender, TextChangedEventArgs e)
        {

        }
    }
}
