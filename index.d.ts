export declare interface EncryTion {
  encrypt:(input:string,password?:string)=>string
  decrypt:(input:string,password?:string)=>string
}
export declare const Encry:EncryTion