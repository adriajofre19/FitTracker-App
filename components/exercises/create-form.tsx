import { Input } from "../ui/input";

const createExercise = async (exercise:any) => {
    const response = await fetch('/api/exercises/create', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(exercise)});
    return response.json();
}

export default function CreateForm() {
    <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const exercise = {
            name: formData.get('name'),
            force: formData.get('force'),
            level: formData.get('level'),
            category: formData.get('category'),
            mechanic: formData.get('mechanic'),
          };
          await createExercise(exercise);
        }}
      >
        
          <Input type="text" id="name" name="name" required />
          <Input type="text" id="force" name="force" required />
          <Input type="text" id="level" name="level" required />
          <Input type="text" id="category" name="category" required />
          <Input type="text" id="mechanic" name="mechanic" required />

        
        <button type="submit">Create</button>
      </form>
}