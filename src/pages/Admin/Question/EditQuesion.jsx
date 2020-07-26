import React from 'react';
import { Button, Input, message, Row, Col } from 'antd';
import { addQuestion } from '@/api/index';
import { Excel } from '@/pages/Admin/Question/UploadXlsx';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import './QustionEditor.less';

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };
    this.inputChange = this.inputChange.bind(this);
    this.Finish = this.Finish.bind(this);
  }

  inputChange(e) {
    if (e.target.name === 'title') {
      this.setState({
        title: e.target.value
      });
    } else {
      this.setState({
        content: e.target.value
      });
    }
  }

  Finish() {
    addQuestion(this.state).then(r => {
      message.success('添加成功！');
    });
  }

  render() {
    var marked = require('marked');
    marked.setOptions({
      highlight(code) {
        return hljs.highlightAuto(code).value;
      },
      renderer: new marked.Renderer(),
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    return (
      <div className="question-editor">
        <Row>
          <Col span={12}>
            <div>
              题目：
              <Input.TextArea rows={4} name="title" onChange={this.inputChange} />
            </div>
            <div>
              答案：
              <Input.TextArea
                rows={4}
                name="content"
                onChange={this.inputChange}
              />
            </div>
            <Button onClick={this.Finish}>添加题目</Button>
            <Excel />
          </Col>
          <Col span={1}></Col>
          <Col span={11}>
            预览：
            <div className="question-preview"
                 dangerouslySetInnerHTML={{__html: marked(this.state.title).replace(/<pre>/g, "<pre class='hljs'>")}}>
            </div>

          </Col>
        </Row>
      </div>
    );
  }
}

export default function EditQuestion() {
  return <QuestionEditor/>;
}
