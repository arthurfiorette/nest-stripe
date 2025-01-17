export enum WebhookEventType {
  all = '*',
  /**
   * Occurs whenever an account status or property has changed.
   */
  accountUpdated = 'account.updated',

  /**
   * Occurs whenever a user authorizes an application. Sent to the related application only.
   */
  accountApplicationAuthorized = 'account.application.authorized',

  /**
   * Occurs whenever a user deauthorizes an application. Sent to the related application only.
   */
  accountApplicationDeauthorized = 'account.application.deauthorized',

  /**
   * Occurs whenever an external account is created.
   */
  accountExternalAccountCreated = 'account.external_account.created',

  /**
   * Occurs whenever an external account is deleted.
   */
  accountExternalAccountDeleted = 'account.external_account.deleted',

  /**
   * Occurs whenever an external account is updated.
   */
  accountExternalAccountUpdated = 'account.external_account.updated',

  /**
   * Occurs whenever an application fee is created on a charge.
   */
  applicationFeeCreated = 'application_fee.created',

  /**
   * Occurs whenever an application fee is refunded, whether from refunding a charge or from refunding the application fee directly. This includes partial refunds.
   */
  applicationFeeRefunded = 'application_fee.refunded',

  /**
   * Occurs whenever an application fee refund is updated.
   */
  applicationFeeRefundUpdated = 'application_fee.refund.updated',

  /**
   * Occurs whenever your Stripe balance has been updated (e.g., when a charge is available to be paid out). By default, Stripe automatically transfers funds in your balance to your bank account on a daily basis.
   */
  balanceAvailable = 'balance.available',

  /**
   * Occurs whenever a portal configuration is created.
   */
  billingPortalConfigurationCreated = 'billing_portal.configuration.created',

  /**
   * Occurs whenever a portal configuration is updated.
   */
  billingPortalConfigurationUpdated = 'billing_portal.configuration.updated',

  /**
   * Occurs whenever a portal session is created.
   */
  billingPortalSessionCreated = 'billing_portal.session.created',

  /**
   * Occurs whenever a capability has new requirements or a new status.
   */
  capabilityUpdated = 'capability.updated',

  /**
   * Occurs whenever there is a positive remaining cash balance after Stripe automatically reconciles new funds into the cash balance. If you enabled manual reconciliation, this webhook will fire whenever there are new funds into the cash balance.
   */
  cashBalanceFundsAvailable = 'cash_balance.funds_available',

  /**
   * Occurs whenever a previously uncaptured charge is captured.
   */
  chargeCaptured = 'charge.captured',

  /**
   * Occurs whenever an uncaptured charge expires.
   */
  chargeExpired = 'charge.expired',

  /**
   * Occurs whenever a failed charge attempt occurs.
   */
  chargeFailed = 'charge.failed',

  /**
   * Occurs whenever a pending charge is created.
   */
  chargePending = 'charge.pending',

  /**
   * Occurs whenever a charge is refunded, including partial refunds.
   */
  chargeRefunded = 'charge.refunded',

  /**
   * Occurs whenever a charge is successful.
   */
  chargeSucceeded = 'charge.succeeded',

  /**
   * Occurs whenever a charge description or metadata is updated.
   */
  chargeUpdated = 'charge.updated',

  /**
   * Occurs when a dispute is closed and the dispute status changes to lost, warning_closed, or won.
   */
  chargeDisputeClosed = 'charge.dispute.closed',

  /**
   * Occurs whenever a customer disputes a charge with their bank.
   */
  chargeDisputeCreated = 'charge.dispute.created',

  /**
   * Occurs when funds are reinstated to your account after a dispute is closed. This includes partially refunded payments.
   */
  chargeDisputeFundsReinstated = 'charge.dispute.funds_reinstated',

  /**
   * Occurs when funds are removed from your account due to a dispute.
   */
  chargeDisputeFundsWithdrawn = 'charge.dispute.funds_withdrawn',

  /**
   * Occurs when the dispute is updated (usually with evidence).
   */
  chargeDisputeUpdated = 'charge.dispute.updated',

  /**
   * Occurs whenever a refund is updated, on selected payment methods.
   */
  chargeRefundUpdated = 'charge.refund.updated',

  /**
   * Occurs when a payment intent using a delayed payment method fails.
   */
  checkoutSessionAsyncPaymentFailed = 'checkout.session.async_payment_failed',

  /**
   * Occurs when a payment intent using a delayed payment method finally succeeds.
   */
  checkoutSessionAsyncPaymentSucceeded = 'checkout.session.async_payment_succeeded',

  /**
   * Occurs when a Checkout Session has been successfully completed.
   */
  checkoutSessionCompleted = 'checkout.session.completed',

  /**
   * Occurs when a Checkout Session is expired.
   */
  checkoutSessionExpired = 'checkout.session.expired',

  /**
   * Occurs whenever a coupon is created.
   */
  couponCreated = 'coupon.created',

  /**
   * Occurs whenever a coupon is deleted.
   */
  couponDeleted = 'coupon.deleted',

  /**
   * Occurs whenever a coupon is updated.
   */
  couponUpdated = 'coupon.updated',

  /**
   * Occurs whenever a credit note is created.
   */
  creditNoteCreated = 'credit_note.created',

  /**
   * Occurs whenever a credit note is updated.
   */
  creditNoteUpdated = 'credit_note.updated',

  /**
   * Occurs whenever a credit note is voided.
   */
  creditNoteVoided = 'credit_note.voided',

  /**
   * Occurs whenever a new customer is created.
   */
  customerCreated = 'customer.created',

  /**
   * Occurs whenever a customer is deleted.
   */
  customerDeleted = 'customer.deleted',

  /**
   * Occurs whenever any property of a customer changes.
   */
  customerUpdated = 'customer.updated',

  /**
   * Occurs whenever a coupon is attached to a customer.
   */
  customerDiscountCreated = 'customer.discount.created',

  /**
   * Occurs whenever a coupon is removed from a customer.
   */
  customerDiscountDeleted = 'customer.discount.deleted',

  /**
   * Occurs whenever a customer is switched from one coupon to another.
   */
  customerDiscountUpdated = 'customer.discount.updated',

  /**
   * Occurs whenever a new source is created for a customer.
   */
  customerSourceCreated = 'customer.source.created',

  /**
   * Occurs whenever a source is removed from a customer.
   */
  customerSourceDeleted = 'customer.source.deleted',

  /**
   * Occurs whenever a card or source will expire at the end of the month.
   */
  customerSourceExpiring = 'customer.source.expiring',

  /**
   * Occurs whenever a source’s details are changed.
   */
  customerSourceUpdated = 'customer.source.updated',

  /**
   * Occurs whenever a customer is signed up for a new plan.
   */
  customerSubscriptionCreated = 'customer.subscription.created',

  /**
   * Occurs whenever a customer’s subscription ends.
   */
  customerSubscriptionDeleted = 'customer.subscription.deleted',

  /**
   * Occurs whenever a customer’s subscription’s pending update is applied, and the subscription is updated.
   */
  customerSubscriptionPendingUpdateApplied = 'customer.subscription.pending_update_applied',

  /**
   * Occurs whenever a customer’s subscription’s pending update expires before the related invoice is paid.
   */
  customerSubscriptionPendingUpdateExpired = 'customer.subscription.pending_update_expired',

  /**
   * Occurs three days before a subscription’s trial period is scheduled to end, or when a trial is ended immediately (using trial_end=now).
   */
  customerSubscriptionTrialWillEnd = 'customer.subscription.trial_will_end',

  /**
   * Occurs whenever a subscription changes (e.g., switching from one plan to another, or changing the status from trial to active).
   */
  customerSubscriptionUpdated = 'customer.subscription.updated',

  /**
   * Occurs whenever a tax ID is created for a customer.
   */
  customerTaxIdCreated = 'customer.tax_id.created',

  /**
   * Occurs whenever a tax ID is deleted from a customer.
   */
  customerTaxIdDeleted = 'customer.tax_id.deleted',

  /**
   * Occurs whenever a customer’s tax ID is updated.
   */
  customerTaxIdUpdated = 'customer.tax_id.updated',

  /**
   * Occurs whenever a new Stripe-generated file is available for your account.
   */
  fileCreated = 'file.created',

  /**
   * Occurs when a new Financial Connections account is created.
   */
  financialConnectionsAccountCreated = 'financial_connections.account.created',

  /**
   * Occurs when a Financial Connections account’s status is updated from active to inactive.
   */
  financialConnectionsAccountDeactivated = 'financial_connections.account.deactivated',

  /**
   * Occurs when a Financial Connections account is disconnected.
   */
  financialConnectionsAccountDisconnected = 'financial_connections.account.disconnected',

  /**
   * Occurs when a Financial Connections account’s status is updated from inactive to active.
   */
  financialConnectionsAccountReactivated = 'financial_connections.account.reactivated',

  /**
   * Occurs when an Account’s balance_refresh status transitions from pending to either succeeded or failed.
   */
  financialConnectionsAccountRefreshedBalance = 'financial_connections.account.refreshed_balance',

  /**
   * Occurs whenever a VerificationSession is canceled
   */
  identityVerificationSessionCanceled = 'identity.verification_session.canceled',

  /**
   * Occurs whenever a VerificationSession is created
   */
  identityVerificationSessionCreated = 'identity.verification_session.created',

  /**
   * Occurs whenever a VerificationSession transitions to processing
   */
  identityVerificationSessionProcessing = 'identity.verification_session.processing',

  /**
   * Occurs whenever a VerificationSession is redacted.
   */
  identityVerificationSessionRedacted = 'identity.verification_session.redacted',

  /**
   * Occurs whenever a VerificationSession transitions to require user input
   */
  identityVerificationSessionRequiresInput = 'identity.verification_session.requires_input',

  /**
   * Occurs whenever a VerificationSession transitions to verified
   */
  identityVerificationSessionVerified = 'identity.verification_session.verified',

  /**
   * Occurs whenever a new invoice is created. To learn how webhooks can be used with this event, and how they can affect it, see Using Webhooks with Subscriptions.
   */
  invoiceCreated = 'invoice.created',

  /**
   * Occurs whenever a draft invoice is deleted.
   */
  invoiceDeleted = 'invoice.deleted',

  /**
   * Occurs whenever a draft invoice cannot be finalized. See the invoice’s last finalization error for details.
   */
  invoiceFinalizationFailed = 'invoice.finalization_failed',

  /**
   * Occurs whenever a draft invoice is finalized and updated to be an open invoice.
   */
  invoiceFinalized = 'invoice.finalized',

  /**
   * Occurs whenever an invoice is marked uncollectible.
   */
  invoiceMarkedUncollectible = 'invoice.marked_uncollectible',

  /**
   * Occurs whenever an invoice payment attempt succeeds or an invoice is marked as paid out-of-band.
   */
  invoicePaid = 'invoice.paid',

  /**
   * Occurs whenever an invoice payment attempt requires further user action to complete.
   */
  invoicePaymentActionRequired = 'invoice.payment_action_required',

  /**
   * Occurs whenever an invoice payment attempt fails, due either to a declined payment or to the lack of a stored payment method.
   */
  invoicePaymentFailed = 'invoice.payment_failed',

  /**
   * Occurs whenever an invoice payment attempt succeeds.
   */
  invoicePaymentSucceeded = 'invoice.payment_succeeded',

  /**
   * Occurs whenever an invoice email is sent out.
   */
  invoiceSent = 'invoice.sent',

  /**
   * Occurs X number of days before a subscription is scheduled to create an invoice that is automatically charged—where X is determined by your subscriptions settings. Note: The received Invoice object will not have an invoice ID.
   */
  invoiceUpcoming = 'invoice.upcoming',

  /**
   * Occurs whenever an invoice changes (e.g., the invoice amount).
   */
  invoiceUpdated = 'invoice.updated',

  /**
   * Occurs whenever an invoice is voided.
   */
  invoiceVoided = 'invoice.voided',

  /**
   * Occurs whenever an invoice item is created.
   */
  invoiceitemCreated = 'invoiceitem.created',

  /**
   * Occurs whenever an invoice item is deleted.
   */
  invoiceitemDeleted = 'invoiceitem.deleted',

  /**
   * Occurs whenever an invoice item is updated.
   */
  invoiceitemUpdated = 'invoiceitem.updated',

  /**
   * Occurs whenever an authorization is created.
   */
  issuingAuthorizationCreated = 'issuing_authorization.created',

  /**
   * Represents a synchronous request for authorization, see Using your integration to handle authorization requests.
   */
  issuingAuthorizationRequest = 'issuing_authorization.request',

  /**
   * Occurs whenever an authorization is updated.
   */
  issuingAuthorizationUpdated = 'issuing_authorization.updated',

  /**
   * Occurs whenever a card is created.
   */
  issuingCardCreated = 'issuing_card.created',

  /**
   * Occurs whenever a card is updated.
   */
  issuingCardUpdated = 'issuing_card.updated',

  /**
   * Occurs whenever a cardholder is created.
   */
  issuingCardholderCreated = 'issuing_cardholder.created',

  /**
   * Occurs whenever a cardholder is updated.
   */
  issuingCardholderUpdated = 'issuing_cardholder.updated',

  /**
   * Occurs whenever a dispute is won, lost or expired.
   */
  issuingDisputeClosed = 'issuing_dispute.closed',

  /**
   * Occurs whenever a dispute is created.
   */
  issuingDisputeCreated = 'issuing_dispute.created',

  /**
   * Occurs whenever funds are reinstated to your account for an Issuing dispute.
   */
  issuingDisputeFundsReinstated = 'issuing_dispute.funds_reinstated',

  /**
   * Occurs whenever a dispute is submitted.
   */
  issuingDisputeSubmitted = 'issuing_dispute.submitted',

  /**
   * Occurs whenever a dispute is updated.
   */
  issuingDisputeUpdated = 'issuing_dispute.updated',

  /**
   * Occurs whenever an issuing transaction is created.
   */
  issuingTransactionCreated = 'issuing_transaction.created',

  /**
   * Occurs whenever an issuing transaction is updated.
   */
  issuingTransactionUpdated = 'issuing_transaction.updated',

  /**
   * Occurs whenever a Mandate is updated.
   */
  mandateUpdated = 'mandate.updated',

  /**
   * Occurs whenever an order is created.
   */
  orderCreated = 'order.created',

  /**
   * Occurs when a PaymentIntent has funds to be captured. Check the amount_capturable property on the PaymentIntent to determine the amount that can be captured. You may capture the PaymentIntent with an amount_to_capture value up to the specified amount. Learn more about capturing PaymentIntents.
   */
  paymentIntentAmountCapturableUpdated = 'payment_intent.amount_capturable_updated',

  /**
   * Occurs when a PaymentIntent is canceled.
   */
  paymentIntentCanceled = 'payment_intent.canceled',

  /**
   * Occurs when a new PaymentIntent is created.
   */
  paymentIntentCreated = 'payment_intent.created',

  /**
   * Occurs when funds are applied to a customer_balance PaymentIntent and the ‘amount_remaining’ changes.
   */
  paymentIntentPartiallyFunded = 'payment_intent.partially_funded',

  /**
   * Occurs when a PaymentIntent has failed the attempt to create a payment method or a payment.
   */
  paymentIntentPaymentFailed = 'payment_intent.payment_failed',

  /**
   * Occurs when a PaymentIntent has started processing.
   */
  paymentIntentProcessing = 'payment_intent.processing',

  /**
   * Occurs when a PaymentIntent transitions to requires_action state
   */
  paymentIntentRequiresAction = 'payment_intent.requires_action',

  /**
   * Occurs when a PaymentIntent has successfully completed payment.
   */
  paymentIntentSucceeded = 'payment_intent.succeeded',

  /**
   * Occurs when a payment link is created.
   */
  paymentLinkCreated = 'payment_link.created',

  /**
   * Occurs when a payment link is updated.
   */
  paymentLinkUpdated = 'payment_link.updated',

  /**
   * Occurs whenever a new payment method is attached to a customer.
   */
  paymentMethodAttached = 'payment_method.attached',

  /**
   * Occurs whenever a payment method’s details are automatically updated by the network.
   */
  paymentMethodAutomaticallyUpdated = 'payment_method.automatically_updated',

  /**
   * Occurs whenever a payment method is detached from a customer.
   */
  paymentMethodDetached = 'payment_method.detached',

  /**
   * Occurs whenever a payment method is updated via the PaymentMethod update API.
   */
  paymentMethodUpdated = 'payment_method.updated',

  /**
   * Occurs whenever a payout is canceled.
   */
  payoutCanceled = 'payout.canceled',

  /**
   * Occurs whenever a payout is created.
   */
  payoutCreated = 'payout.created',

  /**
   * Occurs whenever a payout attempt fails.
   */
  payoutFailed = 'payout.failed',

  /**
   * Occurs whenever a payout is expected to be available in the destination account. If the payout fails, a payout.failed notification is also sent, at a later time.
   */
  payoutPaid = 'payout.paid',

  /**
   * Occurs whenever a payout is updated.
   */
  payoutUpdated = 'payout.updated',

  /**
   * Occurs whenever a person associated with an account is created.
   */
  personCreated = 'person.created',

  /**
   * Occurs whenever a person associated with an account is deleted.
   */
  personDeleted = 'person.deleted',

  /**
   * Occurs whenever a person associated with an account is updated.
   */
  personUpdated = 'person.updated',

  /**
   * Occurs whenever a plan is created.
   */
  planCreated = 'plan.created',

  /**
   * Occurs whenever a plan is deleted.
   */
  planDeleted = 'plan.deleted',

  /**
   * Occurs whenever a plan is updated.
   */
  planUpdated = 'plan.updated',

  /**
   * Occurs whenever a price is created.
   */
  priceCreated = 'price.created',

  /**
   * Occurs whenever a price is deleted.
   */
  priceDeleted = 'price.deleted',

  /**
   * Occurs whenever a price is updated.
   */
  priceUpdated = 'price.updated',

  /**
   * Occurs whenever a product is created.
   */
  productCreated = 'product.created',

  /**
   * Occurs whenever a product is deleted.
   */
  productDeleted = 'product.deleted',

  /**
   * Occurs whenever a product is updated.
   */
  productUpdated = 'product.updated',

  /**
   * Occurs whenever a promotion code is created.
   */
  promotionCodeCreated = 'promotion_code.created',

  /**
   * Occurs whenever a promotion code is updated.
   */
  promotionCodeUpdated = 'promotion_code.updated',

  /**
   * Occurs whenever a quote is accepted.
   */
  quoteAccepted = 'quote.accepted',

  /**
   * Occurs whenever a quote is canceled.
   */
  quoteCanceled = 'quote.canceled',

  /**
   * Occurs whenever a quote is created.
   */
  quoteCreated = 'quote.created',

  /**
   * Occurs whenever a quote is finalized.
   */
  quoteFinalized = 'quote.finalized',

  /**
   * Occurs whenever an early fraud warning is created.
   */
  radarEarlyFraudWarningCreated = 'radar.early_fraud_warning.created',

  /**
   * Occurs whenever an early fraud warning is updated.
   */
  radarEarlyFraudWarningUpdated = 'radar.early_fraud_warning.updated',

  /**
   * Occurs whenever a recipient is created.
   */
  recipientCreated = 'recipient.created',

  /**
   * Occurs whenever a recipient is deleted.
   */
  recipientDeleted = 'recipient.deleted',

  /**
   * Occurs whenever a recipient is updated.
   */
  recipientUpdated = 'recipient.updated',

  /**
   * Occurs whenever a requested ReportRun failed to complete.
   */
  reportingReportRunFailed = 'reporting.report_run.failed',

  /**
   * Occurs whenever a requested ReportRun completed succesfully.
   */
  reportingReportRunSucceeded = 'reporting.report_run.succeeded',

  /**
   * Occurs whenever a ReportType is updated (typically to indicate that a new day’s data has come available).
   */
  reportingReportTypeUpdated = 'reporting.report_type.updated',

  /**
   * Occurs whenever a review is closed. The review’s reason field indicates why: approved, disputed, refunded, or refunded_as_fraud.
   */
  reviewClosed = 'review.closed',

  /**
   * Occurs whenever a review is opened.
   */
  reviewOpened = 'review.opened',

  /**
   * Occurs when a SetupIntent is canceled.
   */
  setupIntentCanceled = 'setup_intent.canceled',

  /**
   * Occurs when a new SetupIntent is created.
   */
  setupIntentCreated = 'setup_intent.created',

  /**
   * Occurs when a SetupIntent is in requires_action state.
   */
  setupIntentRequiresAction = 'setup_intent.requires_action',

  /**
   * Occurs when a SetupIntent has failed the attempt to setup a payment method.
   */
  setupIntentSetupFailed = 'setup_intent.setup_failed',

  /**
   * Occurs when an SetupIntent has successfully setup a payment method.
   */
  setupIntentSucceeded = 'setup_intent.succeeded',

  /**
   * Occurs whenever a Sigma scheduled query run finishes.
   */
  sigmaScheduledQueryRunCreated = 'sigma.scheduled_query_run.created',

  /**
   * Occurs whenever a SKU is created.
   */
  skuCreated = 'sku.created',

  /**
   * Occurs whenever a SKU is deleted.
   */
  skuDeleted = 'sku.deleted',

  /**
   * Occurs whenever a SKU is updated.
   */
  skuUpdated = 'sku.updated',

  /**
   * Occurs whenever a source is canceled.
   */
  sourceCanceled = 'source.canceled',

  /**
   * Occurs whenever a source transitions to chargeable.
   */
  sourceChargeable = 'source.chargeable',

  /**
   * Occurs whenever a source fails.
   */
  sourceFailed = 'source.failed',

  /**
   * Occurs whenever a source mandate notification method is set to manual.
   */
  sourceMandateNotification = 'source.mandate_notification',

  /**
   * Occurs whenever the refund attributes are required on a receiver source to process a refund or a mispayment.
   */
  sourceRefundAttributesRequired = 'source.refund_attributes_required',

  /**
   * Occurs whenever a source transaction is created.
   */
  sourceTransactionCreated = 'source.transaction.created',

  /**
   * Occurs whenever a source transaction is updated.
   */
  sourceTransactionUpdated = 'source.transaction.updated',

  /**
   * Occurs whenever a subscription schedule is canceled due to the underlying subscription being canceled because of delinquency.
   */
  subscriptionScheduleAborted = 'subscription_schedule.aborted',

  /**
   * Occurs whenever a subscription schedule is canceled.
   */
  subscriptionScheduleCanceled = 'subscription_schedule.canceled',

  /**
   * Occurs whenever a new subscription schedule is completed.
   */
  subscriptionScheduleCompleted = 'subscription_schedule.completed',

  /**
   * Occurs whenever a new subscription schedule is created.
   */
  subscriptionScheduleCreated = 'subscription_schedule.created',

  /**
   * Occurs 7 days before a subscription schedule will expire.
   */
  subscriptionScheduleExpiring = 'subscription_schedule.expiring',

  /**
   * Occurs whenever a new subscription schedule is released.
   */
  subscriptionScheduleReleased = 'subscription_schedule.released',

  /**
   * Occurs whenever a subscription schedule is updated.
   */
  subscriptionScheduleUpdated = 'subscription_schedule.updated',

  /**
   * Occurs whenever a new tax rate is created.
   */
  taxRateCreated = 'tax_rate.created',

  /**
   * Occurs whenever a tax rate is updated.
   */
  taxRateUpdated = 'tax_rate.updated',

  /**
   * Occurs whenever an action sent to a Terminal reader failed.
   */
  terminalReaderActionFailed = 'terminal.reader.action_failed',

  /**
   * Occurs whenever an action sent to a Terminal reader was successful.
   */
  terminalReaderActionSucceeded = 'terminal.reader.action_succeeded',

  /**
   * Occurs whenever a test clock starts advancing.
   */
  testHelpersTestClockAdvancing = 'test_helpers.test_clock.advancing',

  /**
   * Occurs whenever a test clock is created.
   */
  testHelpersTestClockCreated = 'test_helpers.test_clock.created',

  /**
   * Occurs whenever a test clock is deleted.
   */
  testHelpersTestClockDeleted = 'test_helpers.test_clock.deleted',

  /**
   * Occurs whenever a test clock fails to advance its frozen time.
   */
  testHelpersTestClockInternalFailure = 'test_helpers.test_clock.internal_failure',

  /**
   * Occurs whenever a test clock transitions to a ready status.
   */
  testHelpersTestClockReady = 'test_helpers.test_clock.ready',

  /**
   * Occurs whenever a top-up is canceled.
   */
  topupCanceled = 'topup.canceled',

  /**
   * Occurs whenever a top-up is created.
   */
  topupCreated = 'topup.created',

  /**
   * Occurs whenever a top-up fails.
   */
  topupFailed = 'topup.failed',

  /**
   * Occurs whenever a top-up is reversed.
   */
  topupReversed = 'topup.reversed',

  /**
   * Occurs whenever a top-up succeeds.
   */
  topupSucceeded = 'topup.succeeded',

  /**
   * Occurs whenever a transfer is created.
   */
  transferCreated = 'transfer.created',

  /**
   * Occurs whenever a transfer is reversed, including partial reversals.
   */
  transferReversed = 'transfer.reversed',

  /**
   * Occurs whenever a transfer’s description or metadata is updated.
   */
  transferUpdated = 'transfer.updated',
}
