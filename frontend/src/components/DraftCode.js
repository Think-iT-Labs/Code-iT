import PrismDecorator from 'draft-js-prism';
import 'prismjs';


import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-ruby';



const Draft = require('draft-js');
const React = require('react');
const Immutable = require('immutable');
const ReactDOM = require('react-dom');
const {
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
    Decorator,
    convertFromRaw,
    convertToRaw
} = Draft;

const {Map, List} = Immutable;

class PrismEditor extends React.Component {
    constructor(props) {
        super(props);
        var contentState ;
        var language = (props.language !== undefined) ? props.language : 'javascript' ;

        var decorator = new PrismDecorator({defaultSyntax: language});

        if (props.initialCode !== undefined && props.initialCode !== null ) {
          let jsonObj;
          if (typeof(props.initialCode) === "string") {
            jsonObj = JSON.parse(props.initialCode);
          }
          else {
            jsonObj = props.initialCode
          }
          try {
            contentState = convertFromRaw(
              jsonObj
            )
          } catch (e) {
            console.log("error :  " , e);
            return null
          }
          //console.log(jsonObj);
        } else {
          contentState = convertFromRaw({
            entityMap: {},
            blocks: [
              {
                type: 'header-three',
                text: ''
              },
              {
                type: 'code-block',
                text: ''
              }
            ]
          })

        }

        //console.log("ez  : " , decorator);
        this.state = {
            editorState: EditorState.createWithContent(contentState),
        };


        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {

          this.props.getCode((convertToRaw(editorState.getCurrentContent())))
          this.setState({editorState})
        };

        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);
    }

    componentDidMount() {
      const { language } = this.props;
      // this.countryImage = require(`prismjs/components/prism-${language}`);
    }

    componentWillReceiveProps(nextProps) {
        let newEditorState = EditorState.createEmpty()
        let newDecorator = this.state.editorState.getDecorator() ;
        if (nextProps.language) {
          newDecorator = new PrismDecorator({defaultSyntax: nextProps.language.toLowerCase()});
        }
        if (nextProps.initialCode !== undefined && nextProps.initialCode !== null ) {
           newEditorState = EditorState.createWithContent(convertFromRaw(nextProps.initialCode), newDecorator)
        }
        else {
           newEditorState = EditorState.createWithContent(this.state.editorState.getCurrentContent(), newDecorator)
        }
        this.setState({
          editorState : newEditorState
        })

    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    render() {
        const {editorState} = this.state;

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        return (
            <div className="RichEditor-root">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                    readOnly={this.props.readOnly}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                    readOnly={this.props.readOnly}
                />
                <div className={className} onClick={this.focus}>
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        placeholder="Tell a story..."
                        ref="editor"
                        spellCheck={true}
                        readOnly={this.props.readOnly}
                    />
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];

const BlockStyleControls = (props) => {
    const {editorState , readOnly} = props;
    if (readOnly) {
      return null
    }
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    const {editorState , readOnly} = props;
    if (readOnly) {
      return null
    }
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default PrismEditor
