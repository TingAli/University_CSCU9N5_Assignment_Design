export class BlockComponent {
    public componentName: string;
    public isForLoop: boolean;
    public isIfStatement: boolean;
    
    constructor(
        name: string, forLoop: boolean, ifStatement: boolean) {
        this.componentName = name;
        this.isForLoop = forLoop;
        this.isIfStatement = ifStatement;
    }
}