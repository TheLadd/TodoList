// This is a jsx component called Task
// It's set of properties are listed as a parameter, wrapped in curly braces
export default function Task({ task, taskToggle }) {
    function handleTaskClick() {
        taskToggle(task.id)
    }

    return (
        <div>
            <input type='checkbox' checked={task.completed} onChange={handleTaskClick}/>
            {task.name}
        </div>
    )
}