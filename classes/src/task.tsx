export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

export class TaskItem implements Task {
  public id: number;
  public title: string;
  public description?: string;
  public completed: boolean;
  public createdAt: Date;

  constructor(id: number, title: string, description?: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.completed = false;
    this.createdAt = new Date();
  }

  public complete(): void {
    this.completed = true;
  }

  public toString(): string {
    const status = this.completed ? '✅' : '❌';
    const desc = this.description ? ` - ${this.description}` : '';
    return `${status} [${this.id}] ${this.title}${desc}`;
  }
}