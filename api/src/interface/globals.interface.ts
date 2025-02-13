import express from "express";

export interface IFeature {
  routers: Record<string, express.Router>;
}
