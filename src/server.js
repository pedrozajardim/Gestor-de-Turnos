import ServiceManager from "./manager/ServiceManager.js";

const Servicios = new ServiceManager();
const ver = Servicios.addService("jesus","clinico",1555,true);
console.log(ver)