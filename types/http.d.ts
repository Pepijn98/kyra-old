import { NuxtModule } from "@nuxt/schema";

interface ModuleOptions {
    prefix: string;
    host: string;
    port: number;
    baseURL: string;
    browserBaseURL: string;
    https: boolean;
    debug: boolean;
    proxy: boolean | Record<string, string>;
    retry: boolean | number;
    serverTimeout: boolean | number;
    clientTimeout: boolean | number;
    proxyHeaders: boolean;
    proxyHeadersIgnore: string[];
    headers: Record<string, string>;
}

declare const module: NuxtModule<ModuleOptions>;

declare module "@nuxt/schema" {
  interface NuxtConfig { ["http"]?: Partial<ModuleOptions> }
  interface NuxtOptions { ["http"]?: ModuleOptions }
}

declare module "nuxt/schema" {
  interface NuxtConfig { ["http"]?: Partial<ModuleOptions> }
  interface NuxtOptions { ["http"]?: ModuleOptions }
}

export { ModuleOptions, module as default };
