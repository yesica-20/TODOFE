import axios from 'axios';


interface Todo {
  id: number;
  name: string;
  isComplete: boolean;
}

export const fetchList = async (): Promise<Todo[]> => {
  try {
    const response = await axios.get<Todo[]>('http://localhost:5045/api/Todo');
    console.log('Response:', response);
    return response.data;
  } catch (error: any) {
    
    throw new Error(error?.message || 'An error occurred while fetching the list.');
  }
};
export const saveList = async (name: any,isComplete: boolean=true): Promise<Todo[]> => {

    try {
      const response = await axios.post<any>('http://localhost:5045/api/Todo',{
        name,
        isComplete:true
      });
      console.log('Response:', response);
      return response.data;
    } catch (error: any) {
      
      throw new Error(error?.message || 'An error occurred while fetching the list.');
    }
  };
  export const editTodo = async (name:any,id:number): Promise<number> => {

    try {
      const response = await axios.put<any>(`http://localhost:5045/api/Todo/${id}`,{name});
      console.log('Response:', response);
      return response.data;
    } catch (error: any) {
      
      throw new Error(error?.message || 'An error occurred while fetching the list.');
    }
  };


  export const deleteTodo = async (id: number): Promise<void> => {
    try {
      const response = await axios.delete(`http://localhost:5045/api/Todo/${id}`);
      console.log('Response:', response);
    } catch (error: any) {
      console.error('Error deleting todo:', error);
      throw new Error(error?.message || 'An error occurred while deleting the todo.');
    }
  };
  