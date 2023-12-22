import Task from './Task'

// This is a jsx component called TodoList
// We designate one of it's properties to be 'tasks', which is shown as a parameter
    // Note that this has to be in curly braces for some reason
export default function TodoList({ tasks, taskToggle }) {
    return (
        <div className='list'>{
            tasks.map(task => {
                return <Task key={task.id} task={task} taskToggle={taskToggle}/>
            })
        }</div>
    )
}