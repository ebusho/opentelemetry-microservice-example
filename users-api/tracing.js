'use strict';

require("dotenv").config();

console.log("process.env.NODE_IP: ", process.env.NODE_IP)
console.log("process.env.OPENTELEMETRY_COLLECTOR_URL: ", process.env.OPENTELEMETRY_COLLECTOR_URL)
console.log("process.env.OPENTELEMETRY_SERVICE_NAME: ", process.env.OPENTELEMETRY_SERVICE_NAME)
console.log("process.env.OPENTELEMETRY_DEPLOYMENT_ENVIRONMENT: ", process.env.OPENTELEMETRY_DEPLOYMENT_ENVIRONMENT)

const opentelemetry = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const collectorOptions = {
  url: process.env.OPENTELEMETRY_COLLECTOR_URL
}

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.OPENTELEMETRY_SERVICE_NAME,
    [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: process.env.OPENTELEMETRY_DEPLOYMENT_ENVIRONMENT,
  }),
  traceExporter: new OTLPTraceExporter(collectorOptions),
  instrumentations: [getNodeAutoInstrumentations()]
});

sdk.start()
