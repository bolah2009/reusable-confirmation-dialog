const rootElement = document.querySelector('#root');

const button = (text) => {
  const newbutton = document.createElement('button');
  newbutton.setAttribute('type', 'button');
  const buttonText = document.createTextNode(text);
  newbutton.appendChild(buttonText);

  newbutton.addEventListener('click', openConfirmationDialog);

  return newbutton;
};

const addContent = (content) => {
  const contentElement = document.querySelector('#content');
  const newContent = document.createElement('p');
  const textNode = document.createTextNode(content);

  newContent.appendChild(textNode);
  contentElement.appendChild(newContent);

  return true;
};

const confirmationDialog = (message = 'Are you sure you want to continue?') => {
  const innerHTML = `<section class="dialog-card">
        <span id="close" class="close">x</span>
        <h3>${message}</h3>
        <div>
            <button id="yes-button" type="button">Yes</button>
            <button id="no-button" type="button">No</button>
        </div>
    </section>`;

  const newElement = document.createElement('div');
  newElement.classList.add('pop-up', 'show', 'dialog-modal');
  newElement.innerHTML = innerHTML;

  newElement.addEventListener('click', showConfirmation);

  return newElement;
};

const showConfirmation = ({ currentTarget, target: { id } }) => {
  const clearDialog = () => {
    currentTarget.classList.remove('show');
    currentTarget.removeEventListener('click', showConfirmation);
    currentTarget.remove();
  };

  switch (id) {
    case 'yes-button':
      if (addContent("You just clicked 'Yes'")) clearDialog();
      break;
    case 'no-button':
      if (addContent("You just clicked 'No'")) clearDialog();
      break;
    case 'close':
      clearDialog();
      break;

    default:
      break;
  }
};

const openConfirmationDialog = () => {
  const customMessage = document.querySelector('#custom-message').value;
  const message = customMessage ? customMessage : undefined; // use default value if no value is set
  rootElement.appendChild(confirmationDialog(message));
};

rootElement.appendChild(button('Click Me'));
