import TOCItems from '@theme-original/TOCItems';

export default function TOCItemsWrapper(props) {
  return (
    <>
      <TOCItems {...props} />
      <div className="contact-support-link-wrapper">
        Need more help?
        <a href="https://dhtmlx.com/docs/technical-support.shtml" className="contact-support-link pagination-nav__link">Contact Support</a>
      </div>
    </>
  );
}
