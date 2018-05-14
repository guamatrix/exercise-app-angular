export interface Exercise {
  id: string;
  name: string;
  duration: number;
  calories: number;
  date?: Date;
  state?: 'completed' | 'cancelled' | null;
}

// export class Exercise {
//   constructor(
//     public exercise: Exercise
//   ) {}
// }
