export class ContactUsMessageModel {
    public constructor(
        public contactUsID?: number,
        public userId?:number,
        public firstName?: string,
        public lastName?: string,
        public email?: string,
        public phone?: string,
        public message?: string,
        public subject: string="",
        public messageDate?:Date){}
}