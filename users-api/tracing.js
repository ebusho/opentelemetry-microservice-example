'use strict';

require("dotenv").config();

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const collectorOptions = {
  url: process.env.OPENTELEMETRY_COLLECTOR_URL
}

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OPENTELEMETRY_SERVICE_NAME,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.OPENTELEMETRY_DEPLOYMENT_ENVIRONMENT,
  }),
  traceExporter: new OTLPTraceExporter(collectorOptions),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
