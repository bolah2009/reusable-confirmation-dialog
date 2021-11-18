class ConfirmationDialog {
  constructor(message) {
    this.message = message;
    this.value = undefined;
    this.showConfirmation = this.#showConfirmation.bind(this);
  }

  createElement() {
    let textNode;
    const sectionElm = document.createElement('section');
    sectionElm.classList.add('dialog-card');

    const closeSpanElm = document.createElement('span');
    textNode = document.createTextNode('x');
    closeSpanElm.appendChild(textNode);
    closeSpanElm.classList.add('close');
    closeSpanElm.id = 'close';
    sectionElm.appendChild(closeSpanElm);

    const messageElm = document.createElement('h3');
    textNode = document.createTextNode(this.message);
    messageElm.appendChild(textNode);
    sectionElm.appendChild(messageElm);

    const creatButtonElm = ({ id, text }) => {
      const buttonElm = document.createElement('button');
      buttonElm.setAttribute('type', 'button');
      buttonElm.id = id;
      textNode = document.createTextNode(text);
      buttonElm.appendChild(textNode);
      return buttonElm;
    };
    const buttonWrapperElm = document.createElement('div');
    buttonWrapperElm.appendChild(creatButtonElm({ id: 'yes-button', text: 'Yes' }));
    buttonWrapperElm.appendChild(creatButtonElm({ id: 'no-button', text: 'No' }));
    sectionElm.appendChild(buttonWrapperElm);

    const newElement = document.createElement('div');
    newElement.classList.add('pop-up', 'show', 'dialog-modal');
    newElement.appendChild(sectionElm);

    newElement.addEventListener('click', this.showConfirmation);
    return newElement;
  }

  get dialogValue() {
    return this.value;
  }

  // keeping these private since they are not used outside of the class
  #showConfirmation({ currentTarget, target: { id } }) {
    switch (id) {
      case 'yes-button':
        this.value = 'yes';
        break;
      case 'no-button':
        this.value = 'no';
        break;
      case 'close':
        break;
      default:
        break;
    }

    this.#clearDialog(currentTarget);
  }

  #dialogClosedEvent(element) {
    this.event = new Event('dialogClosed');
    element.dispatchEvent(this.event);
  }

  #clearDialog(target) {
    target.classList.remove('show');
    target.removeEventListener('click', this.showConfirmation);
    this.#dialogClosedEvent(target);
    target.remove();
  }
}

const rootElement = document.querySelector('#root');

const addContent = (content) => {
  if (!content) return;

  const contentElement = document.querySelector('#content');
  const newContent = document.createElement('p');
  const text = `You just clicked “${content}”`;
  const textNode = document.createTextNode(text);

  newContent.appendChild(textNode);
  contentElement.appendChild(newContent);
};

const openConfirmationDialog = () => {
  const customMessage = document.querySelector('#custom-message').value;
  const message = customMessage || undefined; // use default value if no value is set
  const confirmationDialog = new ConfirmationDialog(message);
  const confirmationDialogElement = confirmationDialog.createElement();
  rootElement.appendChild(confirmationDialogElement);
  confirmationDialogElement.addEventListener('dialogClosed', () =>
    addContent(confirmationDialog.dialogValue),
  );
};

const button = (text) => {
  const newbutton = document.createElement('button');
  newbutton.setAttribute('type', 'button');
  const buttonText = document.createTextNode(text);
  newbutton.appendChild(buttonText);

  newbutton.addEventListener('click', openConfirmationDialog);

  return newbutton;
};

rootElement.appendChild(button('Click Me'));
