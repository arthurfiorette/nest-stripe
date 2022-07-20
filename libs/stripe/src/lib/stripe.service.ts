import { Inject, Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';
import {
  CreateCheckoutSessionDto,
  CreateCustomerDto,
  CustomerResponse,
  CheckoutSessionResponse,
  CreatePriceDto,
  PriceResponse,
  CreateSubscriptionDto,
  SubscriptionResponse,
  InvoicePreviewDto,
  InvoicePreviewResponse,
  CancelSubscriptionDto,
  BaseResponse,
  SubscriptionsResponse,
  SubscriptionDto,
  TaxRate,
  InvoiceDto,
  CreateUsageRecordDto,
  CreateUsageRecordResponse,
  UsageRecordDto,
  PriceDto,
  PlanDto,
  ProductDto,
  SubscriptionItemDto,
  CreatePaymentMethodDto,
  CreatePaymentMethodResponse,
  Card1Dto,
  Card2Dto,
  BaseDataResponse,
} from './dto';
import { StripeConfig, STRIPE_CONFIG } from './stripe.config';
import { StripeLogger } from './stripe.logger';

@Injectable()
export class StripeService {
  protected stripe: Stripe = new Stripe(this.config.apiKey, {
    apiVersion: '2020-08-27'
  });

  constructor(
    @Inject(STRIPE_CONFIG) protected readonly config: StripeConfig,
    private readonly logger: StripeLogger
  ) {}

  async createCheckoutSession(dto: CreateCheckoutSessionDto): Promise<CheckoutSessionResponse> {
    try {
      const metadata = dto.metadata;
      const lineItems = dto.items.map(item => ({
        price_data: {
          currency: this.config.currency || 'USD',
          product_data: {
            name: item.displayName,
            images: item.images,
            metadata: {
              ...item,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      } as unknown as Stripe.Checkout.SessionCreateParams.LineItem));
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: this.config.paymentMethods || ['card'],
        line_items: lineItems,
        mode: 'payment',
        metadata,
        payment_intent_data: {
          metadata,
        },
        success_url: this.config.successUrl,
        cancel_url: this.config.cancelUrl,
      });
      return {
        success: true,
        sessionId: session.id
      };
    } catch (exception) {
      return this.handleError(exception, 'Create Checkout Session');
    }
  }

  async createCustomer(dto: CreateCustomerDto): Promise<CustomerResponse> {
    try {
      let paymentMethod = dto.paymentMethod;
      if (!dto.paymentMethod && dto.paymentMethodData) {
        const response = await this.createPaymentMethod(dto.paymentMethodData);
        if (!response.success) {
          return response;
        }
        paymentMethod = response.paymentMethodId;
      }
      const customer = await this.stripe.customers.create({
        email: dto.email,
        name: dto.name,
        description: dto.description,
        phone: dto.phone,
        address: dto.addressLine1 || dto.addressLine2 ? {
          line1: dto.addressLine1, line2: dto.addressLine2
        } : null,
        invoice_prefix: dto.invoicePrefix,
        metadata:dto.metadata,
        payment_method: paymentMethod,
        preferred_locales: dto.preferredLocales,
        promotion_code: dto.promotionCode,
        source: dto.source,
        shipping: dto.shipping ? {
          name: dto.shipping.name,
          address: { line1: dto.shipping.address, line2: dto.shipping.addressLine2 },
          phone: dto.shipping.phone
        } : null,
        tax_exempt: dto.taxExempt
      });
      return { customerId: customer.id, success: true };
    } catch (exception) {
      return this.handleError(exception, 'Create Customer');
    }
  }

  async createPaymentMethod(dto: CreatePaymentMethodDto): Promise<CreatePaymentMethodResponse> {
    try {
      let card: Stripe.PaymentMethodCreateParams.Card1 | Stripe.PaymentMethodCreateParams.Card2 = dto.card as Card2Dto;
      if ((dto.card as Card1Dto)?.number) {
        const cardDto = (dto.card as Card1Dto)
        card = {
          number: cardDto.number,
          cvc: cardDto.cvc,
          exp_month: cardDto.expMonth,
          exp_year: cardDto.expYear
        } as Stripe.PaymentMethodCreateParams.Card1;
      }
      const payload = {
        acss_debit: dto.acssDebit ? {
          account_number: dto.acssDebit.accountNumber,
          institution_number: dto.acssDebit.institutionNumber,
          transit_number: dto.acssDebit.transitNumber
        } : undefined,
        affirm: dto.affirm,
        afterpay_clearpay: dto.afterPayClearPay,
        alipay: dto.aliPay,
        au_becs_debit: dto.auBecsDebit ? {
          account_number: dto.auBecsDebit.accountNumber,
          bsb_number: dto.auBecsDebit.bsbNumber
        } : undefined,
        bacs_debit: dto.bacsDebit ? {
          account_number: dto.bacsDebit.accountNumber,
          sort_code: dto.bacsDebit.sortCode
        } : undefined,
        bancontact: dto.banContact,
        billing_details: dto.billingDetails ? {
          address: {...dto.billingDetails.address, postal_code: dto.billingDetails.address.postalCode, postalCode: undefined },
          email: dto.billingDetails.email,
          name: dto.billingDetails.name,
          phone: dto.billingDetails.phone,
        } : undefined,
        boleto: dto.boleto ? { tax_id: dto.boleto.taxId } : undefined,
        card,
        customer: dto.customer,
        customer_balance: dto.customerBalance,
        eps: dto.eps ? { bank: dto.eps.bank } : undefined,
        fpx: dto.fpx ? {
          account_holder_type: dto.fpx.accountHolderType,
          bank: dto.fpx.bank
        } : undefined,
        giropay: dto.giroPay,
        grabpay: dto.grabPay,
        ideal: dto.ideal,
        interac_present: dto.interacPresent,
        klarna: dto.klarna ? {
          dob: {
            day: dto.klarna.dobDay,
            month: dto.klarna.dobMonth,
            year: dto.klarna.dobYear
          }
        } : undefined,
        konbini: dto.konbini,
        link: dto.link,
        metadata: dto.metadata,
        p24: dto.p24,
        paynow: dto.payNow,
        promptpay: dto.promptpay,
        radar_options: dto.radar_session ? { session: dto.radar_session } : undefined,
        sepa_debit: dto.sepaDebitIban ? { iban: dto.sepaDebitIban } : undefined,
        sofort: dto.sofortCountry ? { country: dto.sofortCountry } : undefined,
        type: dto.type,
        us_bank_account: dto.usBankAccount ? {
          account_holder_type: dto.usBankAccount.accountHolderType,
          account_number: dto.usBankAccount.accountNumber,
          account_type: dto.usBankAccount.accountType,
          financial_connections_account: dto.usBankAccount.financialConnectionsAccount,
          routing_number: dto.usBankAccount.routingNumber,
        } : undefined,
        wechat_pay: dto.wechatPay
      } as Stripe.PaymentMethodCreateParams;
      const paymentMethod = await this.stripe.paymentMethods.create(payload);
      return { success: true, paymentMethodId: paymentMethod.id };
    } catch (exception) {
      return this.handleError(exception, 'Create Payment Method');
    }
  }

  async attachPaymentMethod(paymentMethodId: string, customerId: string): Promise<CreatePaymentMethodResponse> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.attach(paymentMethodId, {
        customer: customerId
      });
      return { success: true, paymentMethodId: paymentMethod.id }
    } catch (exception) {
      return this.handleError(exception, 'Attach Payment Method');
    }
  }

  async detachPaymentMethod(paymentMethodId: string): Promise<CreatePaymentMethodResponse> {
    try {
      const paymentMethod = await this.stripe.paymentMethods.detach(paymentMethodId);
      return { success: true, paymentMethodId: paymentMethod.id }
    } catch (exception) {
      return this.handleError(exception, 'Attach Payment Method');
    }
  }

  async paymentMethodList(type: Stripe.PaymentMethodListParams.Type, customerId?: string): Promise<BaseDataResponse<Stripe.PaymentMethod[]>> {
    try {
      const paymentMethods = await this.stripe.paymentMethods.list({
        type,
        customer: customerId
      });
      return { success: true, data: paymentMethods.data }
    } catch (exception) {
      return this.handleError(exception, 'Attach Payment Method');
    }
  }

  async createPrice(dto: CreatePriceDto): Promise<PriceResponse> {
    try {
      const price = await this.stripe.prices.create({
        currency: dto.currency || this.config.currency || 'USD',
        active: dto.active != undefined ? dto.active : true,
        billing_scheme: dto.billingScheme,
        lookup_key: dto.lookupKey,
        metadata: dto.metadata,
        nickname: dto.nickname,
        product: dto.productId,
        product_data: dto.productData ? {
          active: dto.productData.active != undefined ? dto.productData.active : true,
          metadata: dto.productData.metadata,
          name: dto.productData.name,
          statement_descriptor: dto.productData.statementDescriptor,
          tax_code: dto.productData.taxCode,
          unit_label: dto.productData.unitLabel
        } : undefined,
        recurring: dto.recurring ? {
          aggregate_usage: dto.recurring.aggregateUsage,
          interval: dto.recurring.interval,
          interval_count: dto.recurring.intervalCount,
          trial_period_days: dto.recurring.trialPeriod_Days,
          usage_type: dto.recurring.usageType
        } : null,
        tax_behavior: dto.taxBehavior,
        tiers: dto.tier ? dto.tier.map(t => ({
          flat_amount: t.flatAmount,
          flat_amount_decimal: t.flatAmountDecimal,
          unit_amount: t.unitAmount,
          unit_amount_decimal: t.unitAmountDecimal,
          up_to: t.upTo
        })) : null,
        tiers_mode: dto.tiersMode,
        transfer_lookup_key: dto.transferLookupKey,
        unit_amount: dto.amount,
        expand: dto.expand
      });
      return {
        success: true,
        priceId: price.id
      };
    } catch (exception) {
      return this.handleError(exception, 'Create Price');
    }
  }

  async createSubscription(dto: CreateSubscriptionDto): Promise<SubscriptionResponse> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: dto.customerId,
        items: [{
          price: dto.priceId
        }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent']
      });
      const invoice = subscription.latest_invoice as Stripe.Invoice;
      const paymentIntent = invoice?.payment_intent as Stripe.PaymentIntent;
      return {
        subscriptionId: subscription.id,
        clientSecret: paymentIntent?.client_secret
      }
    } catch (exception) {
      return this.handleError(exception, 'Create Subscription');
    }
  }

  async customerSubscriptions(customerId: string): Promise<SubscriptionsResponse> {
    try {
      const subscriptions = await this.stripe.subscriptions.list({
        customer: customerId,
        status: 'all',
        expand: ['data.default_payment_method'],
      });
      return {
        success: true,
        subscriptions: subscriptions.data?.map(s => this.subscriptionToDto(s))
      }
    } catch (exception) {
      return this.handleError(exception, 'Customer Subscription list');
    }
  }

  async cancelSubscription(dto: CancelSubscriptionDto): Promise<SubscriptionResponse> {
    try {
      const subscription = await this.stripe.subscriptions.del(dto.subscriptionId);
      
      return {
        success: true,
        subscriptionId: subscription.id,
      }
    } catch (exception) {
      return this.handleError(exception, 'Cancel Subscription');
    }
  }

  async createUsageRecord(subscriptionItemId: string, dto: CreateUsageRecordDto): Promise<CreateUsageRecordResponse> {
    try {
      const usageRecord = await this.stripe.subscriptionItems.createUsageRecord(subscriptionItemId, {
        quantity: dto.quantity,
        action: dto.action,
        timestamp: dto.timestamp
      });
      return {
        success: true,
        usageRecord: this.usageRecordToDto(usageRecord)
      }
    } catch (exception) {
      return this.handleError(exception, 'Create Usage Record');
    }
  }

  async updateDefaultSubscriptionPaymentMethodFromPaymentIntent(subscriptionId: string, paymentIntentId: string): Promise<BaseResponse> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      const subscription = await this.stripe.subscriptions.update(subscriptionId, {
        default_payment_method: paymentIntent.payment_method as string
      })
      return { success: true }
    } catch(exception) {
      return this.handleError(exception, 'Update Default Subscription Payment Method From PaymentIntent')
    }
  }

  async upcomingInvoicePreview(dto: InvoicePreviewDto): Promise<InvoicePreviewResponse> {
    try {
      const invoice = await this.stripe.invoices.retrieveUpcoming({
        customer: dto.customerId,
        subscription: dto.subscriptionId
      })
      return {
        success: true,
        invoice: this.invoiceToDto(invoice),
      }
    } catch (exception) {
      return this.handleError(exception, 'Invoice Preview');
    }
  }

  buildWebhookEvent(payload: string, headerSignature: string) {
    return this.stripe.webhooks.constructEventAsync(payload, headerSignature, this.config.webHookSignature);
  }

  private handleError(exception: any, context: string): BaseResponse {
    this.logger.error(`Stripe: ${context} error`, exception, exception.stack);
    return {
      success: false,
      errorMessage: `Stripe: ${context} error: ${exception.message}`
    }
  }

  private subscriptionToDto(subscription: Stripe.Subscription): SubscriptionDto {
    let latestInvoice = null;
    if (typeof subscription.latest_invoice === 'string') {
      latestInvoice = subscription.latest_invoice;
    } else {
      latestInvoice = this.invoiceToDto(subscription.latest_invoice as Stripe.Invoice)
    }
    return {
      id: subscription.id,
      created: subscription.created,
      applicationFeePercent: subscription.application_fee_percent,
      automaticTaxEnabled: subscription.automatic_tax?.enabled || false,
      billingThresholds: {
        amountGte: subscription.billing_thresholds?.amount_gte,
        resetBillingCycleAnchor: subscription.billing_thresholds?.reset_billing_cycle_anchor
      },
      billingCycleAnchor: subscription.billing_cycle_anchor,
      cancelAt: subscription.cancel_at,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      collectionMethod: subscription.collection_method,
      currency: subscription.currency,
      canceledAt: subscription.canceled_at,
      currentPeriodStart: subscription.current_period_start,
      currentPeriodEnd: subscription.current_period_end,
      customer: subscription.customer,
      daysUntilDue: subscription.days_until_due,
      defaultPaymentMethod: subscription.default_payment_method,
      defaultSource: subscription.default_source,
      defaultTaxRates: subscription.default_tax_rates as unknown as TaxRate[],
      description: subscription.description,
      discount: subscription.discount,
      endedAt: subscription.ended_at,
      items: subscription.items.data.map(i => this.subscriptionItemToDto(i)),
      latestInvoice,
      liveMode: subscription.livemode,
      metadata: subscription.metadata,
      nextPendingInvoiceItemInvoice: subscription.next_pending_invoice_item_invoice,
      object: subscription.object,
      pauseCollection: subscription.pause_collection,
      paymentSettings: subscription.payment_settings,
      pendingInvoiceItemInterval: subscription.pending_invoice_item_interval,
      pendingSetupIntent: subscription.pending_setup_intent,
      pendingUpdate: subscription.pending_update,
      schedule: subscription.schedule,
      startDate: subscription.start_date,
      status: subscription.status,
      testClock: subscription.test_clock,
      transferData: subscription.transfer_data,
      trialEnd: subscription.trial_end,
      trialStart: subscription.trial_start
    };
  }

  private invoiceToDto(invoice: Stripe.Invoice): InvoiceDto {
    let subscription = null;
    if (typeof invoice.subscription === 'string') {
      subscription = invoice.subscription
    } else {
      subscription = this.subscriptionToDto(invoice.subscription);
    }
    return {
      id: invoice.id,
      accountCountry: invoice.account_country,
      accountName: invoice.account_name,
      accountTaxIds: invoice.account_tax_ids,
      amountDue: invoice.amount_due,
      amountPaid: invoice.amount_paid,
      amountRemaining: invoice.amount_remaining,
      application: invoice.application,
      applicationFeeAmount: invoice.application_fee_amount,
      attemptCount: invoice.attempt_count,
      attempted: invoice.attempted,
      autoAdvance: invoice.auto_advance,
      automaticTax: invoice.automatic_tax,
      billingReason: invoice.billing_reason,
      charge: invoice.charge,
      collectionMethod: invoice.collection_method,
      created: invoice.created,
      currency: invoice.currency,
      customer: invoice.customer,
      customFields: invoice.custom_fields,
      customerAddress: invoice.customer_address,
      customerEmail: invoice.customer_email,
      customerName: invoice.customer_name,
      customerPhone: invoice.customer_phone,
      customerShipping: invoice.customer_shipping,
      customerTaxExempt: invoice.customer_tax_exempt,
      customerTaxIds: invoice.customer_tax_ids,
      defaultPaymentMethod: invoice.default_payment_method,
      defaultSource: invoice.default_source,
      defaultTaxRates: invoice.default_tax_rates,
      description: invoice.description,
      discount: invoice.discount,
      discounts: invoice.discounts,
      dueDate: invoice.due_date,
      endingBalance: invoice.ending_balance,
      footer: invoice.footer,
      hostedInvoiceUrl: invoice.hosted_invoice_url,
      invoicePdf: invoice.invoice_pdf,
      lastFinalizationError: invoice.last_finalization_error,
      lines: invoice.lines?.data,
      liveMode: invoice.livemode,
      metadata: invoice.metadata,
      nextPaymentAttempt: invoice.next_payment_attempt,
      number: invoice.number,
      onBehalfOf: invoice.on_behalf_of,
      object: invoice.object,
      paid: invoice.paid,
      paidOutOfBand: invoice.paid_out_of_band,
      paymentIntent: invoice.payment_intent,
      paymentSettings: invoice.payment_settings,
      periodEnd: invoice.period_end,
      periodStart: invoice.period_start,
      postPaymentCreditNotesAmount: invoice.post_payment_credit_notes_amount,
      prePaymentCreditNotesAmount: invoice.pre_payment_credit_notes_amount,
      quote: invoice.quote,
      receiptNumber: invoice.receipt_number,
      renderingOptions: invoice.rendering_options,
      startingBalance: invoice.starting_balance,
      statementDescriptor: invoice.statement_descriptor,
      status: invoice.status,
      statusTransitions: invoice.status_transitions,
      subscription,
      subtotal: invoice.subtotal,
      subtotalExcludingTax: invoice.subtotal_excluding_tax,
      subscriptionProrationDate: invoice.subscription_proration_date,
      tax: invoice.tax,
      testClock: invoice.test_clock,
      total: invoice.total,
      totalDiscountAmounts: invoice.total_discount_amounts,
      totalExcludingTax: invoice.total_excluding_tax,
      totalTaxAmounts: invoice.total_tax_amounts,
      transferData: invoice.transfer_data,
      thresholdReason: invoice.threshold_reason,
      webhooksDeliveredAt: invoice.webhooks_delivered_at
    };
  }

  private usageRecordToDto(usageRecord: Stripe.UsageRecord): UsageRecordDto {
    return {
      id: usageRecord.id,
      liveMode: usageRecord.livemode,
      object: usageRecord.object,
      quantity: usageRecord.quantity,
      subscriptionItem: usageRecord.subscription_item,
      timestamp: usageRecord.timestamp
    }
  }

  private priceToDto(price: Stripe.Price): PriceDto {
    return {
      id: price.id,
      object: price.object,
      active: price.active,
      billingScheme: price.billing_scheme,
      created: price.created,
      currency: price.currency,
      liveMode: price.livemode,
      lookupKey: price.lookup_key,
      metadata: price.metadata,
      nickname: price.nickname,
      product: price.product,
      recurring: price.recurring,
      taxBehavior: price.tax_behavior,
      tiers: price.tiers,
      tiersMode: price.tiers_mode,
      transformQuantity: price.transform_quantity,
      type: price.type,
      unitAmount: price.unit_amount,
      unitAmountDecimal: price.unit_amount_decimal
    }
  }

  private productToDto(product: Stripe.Product): ProductDto {
    let defaultPrice = null;
    if (typeof product.default_price === 'string') {
      defaultPrice = product.default_price;
    } else {
      defaultPrice = this.priceToDto(product.default_price as Stripe.Price);
    }
    return {
      id: product.id,
      object: product.object,
      active: product.active,
      attributes: product.attributes,
      caption: product.caption,
      created: product.created,
      deactivateOn: product.deactivate_on,
      description: product.description,
      defaultPrice,
      images: product.images,
      liveMode: product.livemode,
      metadata: product.metadata,
      name: product.name,
      packageDimensions: product.package_dimensions,
      shippable: product.shippable,
      statementDescriptor: product.statement_descriptor,
      taxCode: product.tax_code,
      type: product.type,
      unitLabel: product.unit_label,
      updated: product.updated,
      url: product.url
    }
  }

  private planToDto(plan: Stripe.Plan): PlanDto {
    let product = null;
    if (typeof plan.product === 'string') {
      product = plan.product;
    } else {
      product = this.productToDto(plan.product as Stripe.Product);
    }
    return {
      id: plan.id,
      object: plan.object,
      active: plan.active,
      aggregateUsage: plan.aggregate_usage,
      amount: plan.amount,
      amountDecimal: plan.amount_decimal,
      billingScheme: plan.billing_scheme,
      created: plan.created,
      currency: plan.currency,
      interval: plan.interval,
      intervalCount: plan.interval_count,
      liveMode: plan.livemode,
      metadata: plan.metadata,
      nickname: plan.nickname,
      product,
      tiers: plan.tiers,
      tiersMode: plan.tiers_mode,
      transformUsage: plan.transform_usage,
      trialPeriodDays: plan.trial_period_days,
      usageType: plan.usage_type
    }
  }

  private subscriptionItemToDto(item: Stripe.SubscriptionItem): SubscriptionItemDto {
    return {
      id: item.id,
      object: item.object,
      billingThresholds: item.billing_thresholds,
      created: item.created,
      metadata: item.metadata,
      plan: item.plan && this.planToDto(item.plan),
      price: item.price && this.priceToDto(item.price),
      quantity: item.quantity,
      subscription: item.subscription,
      taxRates: item.tax_rates
    }
  }
}
