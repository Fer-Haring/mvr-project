/* eslint-disable no-console */
import { Coordinator } from '@sinapsis-co/cc-core/common/coordinator';

import { Category } from 'services/business/category';
import { Product } from 'services/business/product';
import { ProductPackage } from 'services/business/product-package';
import { SpaWebapp } from 'services/frontend/spa-webapp';
import { Assets } from 'services/support/assets';
import { CdnApi } from 'services/support/cdn-api';
import { Database } from 'services/support/database';
import { DeployPipeline } from 'services/support/deploy-pipeline';
import { DnsDomainRef } from 'services/support/dns-domain-ref';
import { DnsSubdomainCertificate } from 'services/support/dns-subdomain-certificate';
import { DnsSubdomainHostedZone } from 'services/support/dns-subdomain-hosted-zone';
import { EnvVpc } from 'services/support/env-vpc';
import { GlobalEventBus } from 'services/support/global-event-bus';
import { Notifications } from 'services/support/notifications';

import { globalConstConfig, globalDeployTargetConfig, globalEnvConfig } from './config';
import { Container } from './services/business/container';
import { FrontendWebView } from './services/business/frontend-web-views';
import { Identity } from './services/business/identity';
import { Organization } from './services/business/organization';
import { ProductBarcode } from './services/business/product-barcode';
import { ProductPackageType } from './services/business/product-package-type';
import { PurchaseInvoice } from './services/business/purchase-invoice';
import { PurchaseInvoiceItem } from './services/business/purchase-invoice-item';
import { Recipe } from './services/business/recipe';
import { RecipeIngredient } from './services/business/recipe-ingredient';
import { RecipeType } from './services/business/recipe-type';
import { RetailProductPackage } from './services/business/retail-product-package';
import { RetailRecipe } from './services/business/retail-recipe';
import { Sale } from './services/business/sale';
import { SaleItem } from './services/business/sale-item';
import { SaleItemCodeMapping } from './services/business/sale-item-code-mapping';
import { StockTake } from './services/business/stock-take';
import { StockTakeItem } from './services/business/stock-take-item';
import { UnitOfMeasure } from './services/business/unit-of-measure';
import { Vendor } from './services/business/vendor';
import { VendorItem } from './services/business/vendor-item';
import { Venue } from './services/business/venue';
import { VenueLocation } from './services/business/venue-location';
import { VenueSection } from './services/business/venue-section';

const coordinator = new Coordinator(globalConstConfig, globalEnvConfig, globalDeployTargetConfig);

// SupportService
new DeployPipeline(coordinator);
new DnsSubdomainHostedZone(coordinator);
new DnsDomainRef(coordinator);
new DnsSubdomainCertificate(coordinator);
new CdnApi(coordinator);
new GlobalEventBus(coordinator);
new Notifications(coordinator);
new Assets(coordinator);
new EnvVpc(coordinator);
new Database(coordinator);

// Business
new Identity(coordinator);
new Product(coordinator);
new Category(coordinator);
new ProductPackage(coordinator);
new ProductBarcode(coordinator);
new Venue(coordinator);
new VenueLocation(coordinator);
new VenueSection(coordinator);
new ProductPackageType(coordinator);
new StockTake(coordinator);
new StockTakeItem(coordinator);
new Recipe(coordinator);
new RecipeType(coordinator);
new RecipeIngredient(coordinator);
new Container(coordinator);
new Sale(coordinator);
new SaleItem(coordinator);
new SaleItemCodeMapping(coordinator);
new RetailProductPackage(coordinator);
new RetailRecipe(coordinator);
new Vendor(coordinator);
new VendorItem(coordinator);
new PurchaseInvoice(coordinator);
new PurchaseInvoiceItem(coordinator);
new UnitOfMeasure(coordinator);
new Organization(coordinator);

// Frontend business views
new FrontendWebView(coordinator);

// Frontend
new SpaWebapp(coordinator);

coordinator.build();
