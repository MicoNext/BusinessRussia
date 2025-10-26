export interface TextEditorProps {
  initialContent?: string
  onSave?: (content: string) => void
  editable?: boolean
  className?: string
}

export interface FormatButton {
  name: string
  format: string
  icon: string
  isActive?: boolean
}