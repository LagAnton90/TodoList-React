
import React, {Component} from 'react';



  class TodoContainer extends React.Component {

      constructor () {
        super()

        this.state = {
          todos: []
        }
        //binding methods for proper scope
        this.updateTodo = this.updateTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);


      }

      addTodo(defaultText){
        var addTodo = this.state.todos;
        addTodo.push(defaultText);
        this.setState({todos : addTodo});
      }



      updateTodo(index, text){
        var updTodo = this.state.todos;
        updTodo[index] = text;
        this.setState({todos : updTodo});
    }


      removeTodo(index){
        var allTodos = this.state.todos;
        allTodos.splice(index, 1);
        this.setState({todos : allTodos});
    }




      render(){
        //getting methods from 'this' so they can be passed as props to child component instances 'Todo'(use of 'this' inside map leads to problem with scope)
        var updateTodoContent = this.updateTodo;
        var removeTodo = this.removeTodo;


        return(
          <div>
            <button className='addButton' onClick={this.addTodo.bind(null, "Solve life's mysteries")}>New todo item</button>
            <p className = "quoteSection">"Because adult life is like that.." '-Every adult'</p>
            <div className="TodoContainer">
              {this.state.todos.map(function(content, index){
                  return(<div className = "todoStyling"><Todo index = {index} key = {index} updateTodoContent ={updateTodoContent} removeTodo = {removeTodo}>{content}</Todo></div>)
              }

              )}

            </div>

          </div>

    );

  }

};

class Todo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         editing: false
}
        //binding for proper scope
        this.edit = this.edit.bind(this);
        this.save = this.save.bind(this);
        this.remove = this.remove.bind(this);

}




    edit(){
      this.setState({editing : true})

    }

    remove(){
      this.props.removeTodo(this.props.index);

    }

    save(){
      var input = this.refs.input.value;
      if(input){
        this.props.updateTodoContent(this.props.index, input);
        this.setState({editing : false})
      }
      else{
        alert("Write something to be able to save changes.")
      }

    }

    renderEditMode(){
      return(
          <div>
              <div id>{this.props.children}</div>
              <textarea ref='input' className = 'textArea'></textarea>
              <button className="button" onClick={this.save}>Save changes</button>
          </div>
      )

    }

    renderViewMode(){
      return(
          <div>
              <div id>{this.props.children}</div>
              <button className="button" onClick={this.remove}>Done</button>
              <div className="buttonDivider"/>
              <button className="buttonEdit" onClick={this.edit}>Edit task</button>

          </div>
      )
    }


    render(){
      if(this.state.editing){
        return this.renderEditMode();
        }
      else{
        return this.renderViewMode();
        }

      }



};



export default TodoContainer;
