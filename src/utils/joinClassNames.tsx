function joinClassNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default joinClassNames;
