import React from "react"

function ZapierIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="16" fill="#FFEDE6" />
      <path
        d="M18.4999 16.0044C18.5003 16.7255 18.3702 17.4408 18.1159 18.1156C17.4408 18.3698 16.7254 18.5001 16.0041 18.5002H15.9956C15.2528 18.4993 14.5411 18.3635 13.8844 18.1159C13.63 17.441 13.4998 16.7256 13.5 16.0044V15.9956C13.4997 15.2746 13.6296 14.5595 13.8836 13.8847C14.5586 13.63 15.2742 13.4997 15.9957 13.5H16.0041C16.7255 13.4997 17.4411 13.63 18.116 13.8846C18.3703 14.5593 18.5004 15.2745 18.5 15.9955V16.0043L18.4999 16.0044ZM25.8611 14.3334H20.0239L24.1512 10.2058C23.8272 9.75072 23.4659 9.32348 23.0709 8.92852V8.9282C22.6758 8.53366 22.2487 8.17263 21.7939 7.84883L17.6663 11.9764V6.13922C17.1174 6.04687 16.5617 6.0003 16.005 6L15.9947 6C15.4284 6.00031 14.8738 6.04844 14.3334 6.13922V11.9764L10.2058 7.84883C9.75089 8.17254 9.32395 8.53383 8.92945 8.92891L8.92727 8.93047C8.53293 9.32494 8.17208 9.75151 7.84844 10.2058L11.9763 14.3334H6.13922C6.13922 14.3334 6 15.4297 6 15.9966V16.0034C6 16.5703 6.04805 17.1259 6.13922 17.6666H11.9764L7.84852 21.7942C8.49786 22.7055 9.29453 23.5021 10.2058 24.1515L14.3334 20.0236V25.8611C14.8817 25.953 15.4367 25.9994 15.9927 26H16.0069C16.5629 25.9995 17.1179 25.953 17.6663 25.8611V20.0236L21.7942 24.1515C22.2489 23.8276 22.676 23.4664 23.0709 23.0718L23.0718 23.0709C23.4663 22.6759 23.8273 22.2489 24.1512 21.7942L20.0233 17.6666H25.8611C25.952 17.1268 25.9994 16.5729 26 16.0073V15.9927C25.9994 15.4271 25.952 14.8732 25.8611 14.3334V14.3334Z"
        fill="#FF4A00"
      />
    </svg>
  )
}

function IntegrationCard(props) {
  return (
    <div className="bg-white w-72 h-52 shadow-md text-center items-center flex rounded-sm">
      <div className="w-full">
        <div className="bg-gray-300 relative w-20 h-px top-28" />
        <span className="relative left-60 bottom-5">
          <ZapierIcon />
        </span>
        <img
          className="m-auto mb-16 pb-4"
          src={`/integration-logos/${props.logo}.png`}
          alt={props.name}
        ></img>
      </div>
      <div className="self-end absolute">
        <p className="p-4 relative w-full pb-5 text-sm font-bold text-gray-600">
          {props.name}
        </p>
      </div>
    </div>
  )
}

export default function HomeScreen() {
  return (
    <main className="bg-gray-200 p-6 w-2/3 h-full m-auto">
      <div className="mb-9">
        <p className="-mb-2 text-sm font-bold text-gray-700">Communication</p>
        <div className="bg-gray-300 h-px m-auto my-4" />
        <div className="grid grid-cols-4">
          <IntegrationCard logo={"Discord"} name={"Discord"} />
          <IntegrationCard logo={"Gmail"} name={"Gmail"} />
          <IntegrationCard logo={"PagerDuty"} name={"PagerDuty"} />
          <IntegrationCard logo={"Slack"} name={"Slack"} />
        </div>
      </div>

      <div className="mb-9">
        <p className="-mb-2 text-sm font-bold text-gray-700">Monitoring</p>
        <div className="bg-gray-300 h-px m-auto my-4" />
        <div className="grid grid-cols-4">
          <IntegrationCard logo={"Opsgenie"} name={"OpsGenie"} />
        </div>
      </div>

      <div className="mb-9">
        <p className="-mb-2 text-sm font-bold text-gray-700">Sales & CRM</p>
        <div className="bg-gray-300 h-px m-auto my-4" />
        <div className="grid grid-cols-4">
          <IntegrationCard logo={"Automate"} name={"Connectwise Manage"} />
          <IntegrationCard logo={"Pipedrive"} name={"Pipedrive"} />
          <IntegrationCard logo={"salesforce"} name={"Salesforce"} />
        </div>
      </div>

      <div className="mb-9">
        <p className="-mb-2 text-sm font-bold text-gray-700">Support</p>
        <div className="bg-gray-300 h-px m-auto my-4" />
        <div className="grid grid-cols-4">
          <IntegrationCard logo={"Freshdesk"} name={"Freshdesk"} />
          <IntegrationCard logo={"Helpscout"} name={"Help Scout"} />
          <IntegrationCard logo={"Intercom"} name={"Intercom"} />
          <IntegrationCard logo={"Zendesk"} name={"Zendesk"} />
        </div>
      </div>
    </main>
  )
}
