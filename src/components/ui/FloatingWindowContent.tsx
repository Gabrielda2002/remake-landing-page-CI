interface InputProps {
  title?: string;
  information?: Array<string> | string;
  text?: string;
  image?: string;
  titleWebsite?: string;
  website?: string;
}

export function FloatingWindowContent(props: InputProps) {
  return (
    <div className={`grid ${props.image ? "grid-cols-[35%_65%]" : "grid-cols-1"} gap-4`}>

      {props.image && (
        <div className="flex items-center justify-center">
          <img src={props.image} className="w-37.5 h-auto object-cover rounded" />
        </div>
      )}
      
      <div className="mx-2">
        {props.title && (
          <h6 className="font-semibold mb-5 text-[14px] text-left text-[rgb(0,121,196)]">
            {props.title}
          </h6>
        )}

        {props.information && Array.isArray(props.information) && props.information.length > 0 && (
          <ul className="list-inside space-y-1 mb-3 text-[12px]">
            {props.information.map((item, index) => (
              <li className="p-1" key={index}>{item}</li>
            ))}
          </ul>
        )}

        {props.text && (
          <p className="whitespace-pre-wrap text-[12px] mb-3">
            {props.text}
          </p>
        )}

        {props.website && (
          <a
            href={props.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[rgb(0,121,196)] underline hover:opacity-80 transition-opacity inline-block text-[12px]"
          >
            {props.titleWebsite}
          </a>
        )}
      </div>

    </div>
  );
}