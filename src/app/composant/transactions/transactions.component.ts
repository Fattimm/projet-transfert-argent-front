import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transactions',
  standalone: true,
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
  imports: [CommonModule]
})
export class TransactionsComponent implements OnInit {
  transactions: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (data) => {
        const transactionsSent = this.formatTransactions(data.data.user.transactionsSent, 'sent');
        const transactionsReceived = this.formatTransactions(data.data.user.transactionsReceived, 'received');
        this.transactions = [...transactionsSent, ...transactionsReceived];
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des données utilisateur:', err);
      }
    });
  }

  formatTransactions(transactions: any[], direction: 'sent' | 'received'): any[] {
    return transactions.map(transaction => {
      let description;
      const isCredit = transaction.type_transaction === 'depot';
      const isDebit = ['transfert', 'paiement', 'recharge_credit'].includes(transaction.type_transaction);

      switch (transaction.type_transaction) {
        case 'transfert':
          const receiverName = transaction.receiver
            ? `${transaction.receiver.nom} ${transaction.receiver.prenom}`
            : 'Inconnu';
          const senderName = transaction.sender
            ? `${transaction.sender.nom} ${transaction.sender.prenom}`
            : 'Inconnu';

          description = `À ${receiverName !== 'Inconnu' ? receiverName : senderName}`;
          break;
        case 'depot':
          description = `De ${transaction.sender?.nom ?? ''} ${transaction.sender?.prenom ?? ''}`;
          break;
        case 'paiement':
          const paymentReceiverName = transaction.receiver
            ? `${transaction.receiver.nom} ${transaction.receiver.prenom}`
            : 'Inconnu';
          const paymentSenderName = transaction.sender
            ? `${transaction.sender.nom} ${transaction.sender.prenom}`
            : 'Inconnu';

          // Si le destinataire est connu, affichez "Paiement à <destinataire>", sinon "Paiement de <expéditeur>"
          description = `Paiement à ${paymentReceiverName !== 'Inconnu' ? paymentReceiverName : paymentSenderName}`;
          break;
        case 'recharge_credit':
          const phone = transaction.receiver?.telephone || transaction.sender?.telephone;
          description = `Recharge Crédit pour ${phone ?? 'inconnu'}`;
          break;
        default:
          description = `${transaction.type_transaction.charAt(0).toUpperCase() + transaction.type_transaction.slice(1)}`;
      }

      return {
        type: isCredit ? 'credit' : 'debit',
        description: description,
        date: new Date(transaction.createdAt).toLocaleDateString('fr-FR'),
        amount: isCredit
          ? `+${transaction.montant_recus} F`
          : `-${transaction.montant_envoye} F`
      };
    });
  }

}
