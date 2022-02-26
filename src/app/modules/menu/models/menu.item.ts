export class MenuItem {

    private _name: string;
    private _icon: string;
    private _link: string;

    public constructor(name: string, icon: string, link: string) {

        this._name = name;
        this._icon = icon;
        this._link = link;

    }

    public get name(): string {
    
        return this._name;

    }

    public set name(name: string) {

        this._name = name;

    }

    public get icon(): string {
    
        return this._icon;
    
    }
    
    public set icon(value: string) {
    
        this._icon = value;
    
    }
    
    
    public get link(): string {
    
        return this._link;
    
    }
    
    public set link(value: string) {
   
        this._link = value;
   
    }
}